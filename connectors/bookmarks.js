/*
 * The site's connection to, and representation of, the Raindrop bookmark API.
 *
 * The general principle is that this module isolates anything specific to
 * Raindrop. If we were to change to a different bookmarks back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 *
 * Raindrop bookmark results are paginated: http://raindrop.io/dev/docs#bookmarks.
 * The first page of results includes a `count` property indicating how many
 * total results there are. Once we have that, we know how many more pages of
 * results to ask for.
 *
 * To keep the client as simple as possible, we get *all* bookmarks for a given
 * topic at once. This works at a small scale, but will become slow as we gather
 * 100s of bookmarks per topic. On the plus side:
 *
 * * Since we have server-side caching, once someone visits a page, subsequent
 *   visitors within the cache interval will immediately get a complete page of
 *   results.
 *
 * * This also means that only our server is hitting Raindrop, reducing the
 *   degree to which we may annoy them.
 *
 * At some point, we'd like to have our own DB of bookmarks, and at that point
 * should add infinite-scrolling to the client so the client can request only
 * those results it actually needs to fill the page.
 */


const fetch = require('node-fetch');

const PRESTERITY_BOOKMARK_COLLECTION_ID = 2021037;
const RAINDROP_REST_URL = `https://raindrop.io/api/raindrops/${PRESTERITY_BOOKMARK_COLLECTION_ID}`;
const MAX_BOOKMARKS_PER_PAGE = 40; // Limit imposed by Raindrop.


/*
 * Return a promise for the complete set of bookmarks on the given topic.
 * The topic is identified with a string: "Trump Cabinet".
 *
 * The bookmarks are returned sorted by bookmark title. Since we start bookmark
 * titles with a date in YYYY.MM.DD format, the bookmarks will also be sorted
 * by date.
 */
function bookmarksForTopic(topic) {

  let bookmarks;

  // Fetch the initial results: page 0.
  return getResultsForPage(topic, 0)
  .then(resultPage0 => {

    // Save the page 0 bookmarks.
    bookmarks = resultPage0.items;

    // The results include a `count` property that gives the total number of
    // bookmarks. Use this to calculate how many more pages we need fetch.
    const bookmarkCount = resultPage0.count;
    const pageCount = Math.ceil(bookmarkCount / MAX_BOOKMARKS_PER_PAGE);

    // Now get pages 1..pageCount.
    return getResultsForPages(topic, pageCount);
  })
  .then(additionalResultPages => {

    // Combine bookmarks from additional pages (if any) with set from page 0.
    additionalResultPages.forEach(resultPage => {
      bookmarks = bookmarks.concat(resultPage.items);
    });

    // Raindrop's sorting facilities are limited, so we sort ourselves.
    const sorted = bookmarks.sort(compareBookmarks);

    return sorted;
  });
}

// Sort two bookmarks by title.
// Since the title should start with a date like 2017.01.13, sorting by title
// should produce a chronological sort.
function compareBookmarks(bookmark1, bookmark2) {
  if (bookmark1.title < bookmark2.title) {
    return -1;
  }
  if (bookmark1.title > bookmark2.title) {
    return 1;
  }
  return 0;
}

// Return a promise for the indicated page of results for the given topic.
function getResultsForPage(topic, pageNumber) {
  const escapedTopic = encodeURIComponent(topic);
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${escapedTopic}"}]&perpage=${MAX_BOOKMARKS_PER_PAGE}&page=${pageNumber}`;
  console.log(`Bookmarks: ${url}`);
  return fetch(url)
  .then(response => response.json());
}

// Return the latest bookmarks, up to a maximum of count (but no more than 40).
// The default count is 10.
function mostRecentBookmarks(count = 10) {
  const url = `${RAINDROP_REST_URL}?perpage=${count}`;
  console.log(`Latest bookmarks: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => json.items);
}

// Return a promise for pages 1..pageCount of bookmarks for the given topic.
// This does *not* get the bookmarks on page 0. We handle those separately.
// Accordingly, if pageCount is 0 or 1, this returns a resolved promise for
// an empty array.
function getResultsForPages(topic, pageCount) {
  let promises = [];
  for (let page = 1; page < pageCount; page++) {
    promises = promises.concat(getResultsForPage(topic, page));
  }
  return Promise.all(promises);
}

module.exports = {
  bookmarksForTopic,
  mostRecentBookmarks
};
