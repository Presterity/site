const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const searchResultsList = require('./searchResultsList');
const wiki = require('../connectors/wiki');

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
      body: searchResultsList(json.results),
      title: `Pages tagged with "${label}"`
    };
    return pageTemplate(request, data);
  });
};
