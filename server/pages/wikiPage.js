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
  const pagePromise = fetch(query).then(response => response.json());
  const topicLinksPromise = topicLinks(topic);

  return Promise.all([pagePromise, topicLinksPromise])
  .then(values => {
    const json = values[0];
    const formattedTopicLinks = values[1];
    const result = json.results instanceof Array ? json.results[0] : json;

    if (!result) {
      // Not found.
      return notFoundPage(request, topic);
    }

    const ancestors = result.ancestors;
    const area = ancestors[0] ?
      ancestors[0].title :
      result.title;
    const title = result.title === 'Home' ?
      'Presterity' :
       `${result.title} - Presterity`;
    const heading = result.title === 'Home' ?
      'Presterity' :
      result.title;
    const pageMarkup = result.body.view.value;
    const pageMarkupWithLinks = pageMarkup.replace('<em>(Topic links will automatically appear here.)</em>', formattedTopicLinks);
    const body = wiki.rewriteHtml(pageMarkupWithLinks);

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

    const data = {
      ancestors,
      area,
      body,
      footer,
      heading,
      title
    };
    return pageTemplate(request, data);
  });
};
