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
    const area = 'Search';
    const ancestors = [{ title: 'Home' }];
    let searchHeader = json.results.length > 0 ?
      `Pages containing "${searchText}"` :
      `No pages found`;
    const searchResults = searchResultsList(json.results);
    const body = `
      <form>
        Search for:
        <input name="q" type="text" value="${searchText}">
        <input type="submit" value="Search">
      </form>
      <h3>${searchHeader}</h3>
      ${searchResults}
    `;
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(ancestors),
      body: body,
      title: `Search`
    };
    return pageTemplate(request, data);
  });
};
