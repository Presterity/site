const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const searchResultsList = require('./searchResultsList');
const wiki = require('../connectors/wiki');

/*
 * Return a page that searches for a given text string.
 */
module.exports = (request) => {
  const searchText = request.query.q;
  let searchPromise;
  const isNewSearch = typeof searchText === 'undefined';
  if (isNewSearch) {
    searchPromise = Promise.resolve({});
  } else {
    const query = `${wiki.searchUrl}text~${searchText}`;
    console.log(`Search for: ${query}`);
    searchPromise = fetch(query).then(response => response.json());
  }

  return searchPromise
  .then(json => {

    let searchValue;
    let searchResults;
    if (isNewSearch) {
      searchValue = '';
      searchResults = '';
    } else {
      searchValue = searchText;
      let searchHeader = json.results.length > 0 ?
        `Pages containing "${searchText}"` :
        `No pages found`;
      searchResults = `
        <h3>${searchHeader}</h3>
        ${searchResultsList(json.results)}
      `;
    }

    const body = `
      <form>
        Search for:
        <input name="q" type="text" value="${searchValue}" style="max-width: 50%;">
        <input type="submit" value="Search">
      </form>
      ${searchResults}
    `;

    const data = {
      area: 'Search',
      body: body,
      heading: 'Search'
    };

    return pageTemplate(request, data);
  });
};
