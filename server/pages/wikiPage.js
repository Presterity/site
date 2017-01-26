const notFoundPage = require('./notFoundPage');
const pageTemplate = require('./pageTemplate');
const topicLinks = require('./topicLinks');
const wiki = require('../connectors/wiki');

/*
 * Return a formatted version of the wiki page indicated by the title in the
 * given HTTP request.
 *
 * If the wiki page isn't found, this returns a "Not Found" page.
 */
module.exports = (request) => {

  const wikiPageTitle = wiki.unescapePageTitle(request.params.title);

  // Get the content of the corresponding wiki page.
  const pagePromise = wiki.wikiPageWithTitle(wikiPageTitle);

  // On pages in the /reference area, ask for bookmarks in the form of links.
  const isReferencePage = request.params.area === 'reference';
  const linksPromise = isReferencePage ?
    topicLinks(wikiPageTitle) :
    Promise.resolve('');  // Some other page -- no need to get links.

  // Once we've got the wiki page and topic links, put the page together.
  return Promise.all([pagePromise, linksPromise])
  .then(results => {

    const pageJson = results[0]; // from pagePromise
    const linksHtml = results[1]; // from linksPromise

    if (!pageJson) {
      // We couldn't find a wiki page with that name.
      // Serve up a "Not found" page instead.
      return notFoundPage(request, wikiPageTitle);
    }

    // Extract the bits of the page we care about.
    const area = areaForPage(pageJson.title, pageJson.ancestors);

    // Wiki pages with no ancestors should act like they're under Home, with the
    // exception of Home itself.
    const ancestors = (pageJson.ancestors == null || pageJson.ancestors.length === 0) ?
      [{ title: wiki.HOME_PAGE_TITLE }] :
      pageJson.ancestors;

    const title = `${pageJson.title} - Presterity`;
    const heading = pageJson.title;

    // The main page content with be the wiki page + formatted topic links.
    const body = wiki.replacePlaceholderWithLinks(pageJson.body, linksHtml);

    // Add a footer that's specific to the reference area.
    const footer = isReferencePage ?
      `
        <p>
          You can <a href="/Submissions">submit news</a> on this topic.
          If something's wrong on this page,
          <a href="/Volunteering">help us fix it</a>.
        </p>
        <p>
          This work is licensed under a
          <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        </p>
      ` :
      '';

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


// Determine the site area a page belongs in based on its title and ancestors.
function areaForPage(title, ancestors) {
  if (ancestors.length === 0) {
    // Top-level pages (Search, Volunteering, Submissions) are their own areas.
    return title;
  } else if (ancestors[0].title === wiki.HOME_PAGE_TITLE) {
    // Pages beneath Home area in the "Reference" area.
    return 'Reference';
  } else if (ancestors.length > 0) {
    // Other pages fall under their top ancestor.
    return ancestors[0].title;
  } else {
    // Unknown.
    return '';
  }
}
