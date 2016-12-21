const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const wiki = require('../wiki');

/*
 * Return a formatted version of the label page indicated by the given HTTP
 * request.
 */
module.exports = (request) => {
  const label = request.params.label;
  const query = `${wiki.searchUrl}label=${label}`;
  console.log(`Label page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => {
    const area = 'Home';
    const ancestors = [{ title: 'Home' }];
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(ancestors),
      body: formatSearchResults(json.results),
      title: `Pages tagged with "${label}"`
    };
    return pageTemplate(request, data);
  });
};

function formatSearchResults(results) {
  const links = results.map(result => {
    const title = result.title;
    const escaped = wiki.escapePageTitle(title);
    return `<li><a href="/reference/${escaped}">${title}</a></li>`;
  });
  return `<ul>${links}</ul>`;
}
