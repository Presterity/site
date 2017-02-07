const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const searchResultsList = require('./searchResultsList');
const wiki = require('../connectors/wiki');

/*
 * Return a page that searches for a given text string.
 *
 * The search page is used in two modes. If the request doesn't include a query,
 * the search page just shows a search box. If the request does include a query,
 * the search box is prepopulated with that query, and the results of that query
 * are shown below that.
 *
 */
module.exports = (request) => {

  return searchPromise
  .then(json => {

    // Process the search results.

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
