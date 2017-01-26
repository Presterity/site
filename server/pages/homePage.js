const latestLinks = require('./latestLinks');
const pageTemplate = require('./pageTemplate');
const wiki = require('../connectors/wiki');

/*
 * Return a promise for the Home page in response to the given HTTP request.
 *
 * The Home page content is loaded from the wiki. If the Home page can't be
 * found, this throws an exception.
 */
module.exports = (request) => {

  const wikiPageTitle = wiki.HOME_PAGE_TITLE;
  const pagePromise = wiki.wikiPageWithTitle(wikiPageTitle);
  const linksPromise = latestLinks();

  return Promise.all([pagePromise, linksPromise])
  .then(results => {

    const wikiPageJson = results[0];
    const linksHtml = results[1];

    if (!wikiPageJson) {
      // If we can't find the Home page, it's an error.
      throw `Couldn't find the wiki content for a page titled "${wikiPageTitle}".`;
    }

    const ancestors = []; // No ancestors;
    const area = wikiPageTitle;
    const title = 'Presterity';

    const body = wiki.replacePlaceholderWithLinks(wikiPageJson.body, linksHtml);

    // Pour all that into our standard page template.
    return pageTemplate(request, {
      ancestors,
      area,
      body,
      title
    });
  });
};
