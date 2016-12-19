const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const wiki = require('../wiki');

/*
 * Return a formatted version of the wiki page indicated by the given HTTP
 * request.
 */
module.exports = (request) => {
  let title = request.params.title;
  const url = `${wiki.restUrl}&title=${title}`;
  console.log(`Page: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    const result = json.results[0];
    const area = result.ancestors[0] ?
      result.ancestors[0].title :
      result.title;
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(result.ancestors),
      body: adjustRelativeUrls(result.body.view.value),
      title: result.title
    };
    return pageTemplate(request, data);
  });
};

// Find wiki page titles in HTML and replace them with equivalent site URLs.
function adjustRelativeUrls(html) {
  const wikiUrlRegex = /\/wiki\/display\/DB\/([^"]+)/g;
  return html.replace(wikiUrlRegex, (match, title) =>
      wiki.pageTitleToSiteUrl(title));
}
