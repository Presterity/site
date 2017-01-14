const fetch = require('node-fetch');
const notFoundPage = require('./notFoundPage');
const pageTemplate = require('./pageTemplate');
const topicLinks = require('./topicLinks');
const wiki = require('../connectors/wiki');

/*
 * Return a formatted version of the wiki page indicated by the given HTTP
 * request.
 *
 * If the wiki page isn't found, this returns a "Not Found" page.
 */
module.exports = (request) => {

  const title = request.params.title;
  const topic = wiki.unescapePageTitle(title);
  const query = `${wiki.restUrl}?spaceKey=DB&title=${title}&expand=space,ancestors,body.view`;

  console.log(`Page: ${query}`);

  // Get the content of the corresponding wiki page.
  const pagePromise = fetch(query).then(response => response.json());

  // On pages in the /reference area, ask for bookmarks in the form of links.
  const topicLinksPromise = request.params.area === 'reference' ?
    topicLinks(topic) :
    Promise.resolve('');

  // Once we've got the wiki page and topic links, put the page together.
  return Promise.all([pagePromise, topicLinksPromise])
  .then(values => {

    const { wikiResults, formattedTopicLinks } = values;
    const wikiPageJson = wikiResults.results instanceof Array ?
      wikiResults.results[0] :
      wikiResults;

    if (!wikiPageJson) {
      // We couldn't find a wiki page with that name.
      // Serve up a "Not found" page instead.
      return notFoundPage(request, topic);
    }

    // Extract the bits of the page we care about.

    const ancestors = wikiPageJson.ancestors;
    const area = ancestors[0] ?
      ancestors[0].title :
      wikiPageJson.title;
    const title = wikiPageJson.title === 'Home' ?
      'Presterity' :
       `${wikiPageJson.title} - Presterity`;
    const heading = wikiPageJson.title === 'Home' ?
      'Presterity' :
      wikiPageJson.title;

    // Construct the page body, inserting the formatted topic links.
    const pageMarkup = wikiPageJson.body.view.value;
    const pageMarkupWithLinks = pageMarkup.replace('<em>(Topic links will automatically appear here.)</em>', formattedTopicLinks);

    // The page markup will include link which are relative to the wiki.
    // We fix those up so they refer to URLs on our site instead.
    const body = wiki.rewriteHtml(pageMarkupWithLinks);

    // Add a footer that's specific to the reference area.
    const footer = `
      <p>
        See something wrong or missing on this page?
        Ping us at
        <a href="https://twitter.com/presterity">@presterity</a>
        or
        <a href="/Volunteering">help us fix it</a>!
      </p>
      <p>
        This work is licensed under a
        <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
      </p>
    `;

    // Pour all that into our standard page template.
    return pageTemplate(request, {
      ancestors,
      area,
      body,
      footer,
      heading,
      title
    });
  });
};
