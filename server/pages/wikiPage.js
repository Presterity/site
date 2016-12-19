const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const wiki = require('../wiki');

/*
 * Return a formatted version of the wiki page indicated by the given HTTP
 * request.
 */
module.exports = (request) => {
  const title = request.params.title;
  const query = `${wiki.restUrl}&expand=space,ancestors,body.view&title=${title}`;
  console.log(`Page: ${query}`);
  return fetch(query)
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

// TODO: Should use a real HTML parser.
function adjustRelativeUrls(html) {

  // Replace links to label pages with equivalent site URLs.
  const labelUrlRegex = new RegExp(`${wiki.baseUrl}/wiki/label/DB/([^"]+)`, 'g');
  let result = html.replace(labelUrlRegex, (match, label) =>
      wiki.labelToSiteUrl(label));

  // Replace links to regular pages with equivalent site URLs.
  const pageUrlRegex = new RegExp(`/wiki/display/DB/([^"]+)`, 'g');
  result = result.replace(pageUrlRegex, (match, title) =>
      wiki.pageTitleToSiteUrl(title));

  return result;
}
