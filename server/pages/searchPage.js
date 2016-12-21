const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const searchResultsList = require('./searchResultsList');
const wiki = require('../wiki');

/*
 * Return a page that searches for a given text string.
 */
module.exports = (request) => {
  const searchText = request.query.q;
  const query = `${wiki.searchUrl}text~${searchText}`;
  console.log(`Search page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => {
    const area = 'Home';
    const ancestors = [{ title: 'Home' }];
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(ancestors),
      body: searchResultsList(json.results),
      title: `Pages containing "${searchText}"`
    };
    return pageTemplate(request, data);
  });
};
