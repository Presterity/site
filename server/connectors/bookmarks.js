/*
 * The site's connection to, and represetation of, the Raindrop bookmark API.
 *
 * The general principle is that this module isolates anything specific to
 * Raindrop. If we were to change to a different wiki back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 */


const fetch = require('node-fetch');

const RAINDROP_REST_URL = `https://raindrop.io/api/raindrops/2021037`;
const MAX_BOOKMARKS_PER_PAGE = 40; // Limit imposed by Raindrop.


function bookmarksForTopic(topic) {
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${topic}"}]&perpage=${MAX_BOOKMARKS_PER_PAGE}`;
  console.log(`Bookmarks: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    const sorted = json.items.sort(compareItems);
    return sorted;
  });
}

// Sort two items by title.
// Since the title should start with a date like 2017.01.13, sorting by title
// should produce a chronological sort.
function compareItems(a, b) {
  const aValue = a.title ? a.title.toLowerCase() : '';
  const bValue = b.title ? b.title.toLowerCase() : '';
  if (aValue < bValue) {
    return -1;
  }
  if (aValue > bValue) {
    return 1;
  }
  return 0;
}

module.exports = {
  bookmarksForTopic
};
