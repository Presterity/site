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

// Limit imposed by Raindrop. See note below at getBookmarksStartingFromPage.
const MAX_BOOKMARKS_PER_PAGE = 25;

// Blacklist of individual tags for internal use only, and which will be removed
// before display. Keep these lowercase for easier comparison.
const hideTags = [
  'reviewed'
];

// Blacklist of tags that indicate a bookmark should be hidden from view.
// Keep these lowercase for easier comparison.
const hideBookmarksWithTags = [
  'assessments',
  'hold'
];


/*
 * Return a promise for the complete set of bookmarks on the given topic.
 * The topic is identified with a string: "Trump Cabinet".
 *
 * The bookmarks are returned sorted by bookmark title. Since we start bookmark
 * titles with a date in YYYY.MM.DD format, the bookmarks will also be sorted
 * by date.
 */
async function bookmarksForTopic(topic) {
  const bookmarks = await getBookmarkStartingFromPage(topic, 0);
  const filtered = filterBookmarks(bookmarks);
  // Raindrop's sorting facilities are limited, so we sort ourselves.
  const sorted = filtered.sort(compareBookmarks);
  return sorted;
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

// Return a filtered array of bookmarks:
// * Hide bookmarks that aren't ready to be shown.
// * Hide individual bookmark tags which are only meant for internal use.
function filterBookmarks(bookmarks) {
  // Filter out bookmarks which have a tag on the blacklist.
  const filtered = bookmarks.filter(bookmark => {
    return !bookmark.tags.find(tag =>
      hideBookmarksWithTags.includes(tag.toLowerCase())
    );
  });

  // Filter out tags which shouldn't appear on the site.
  filtered.forEach(bookmark => {
    bookmark.tags = bookmark.tags && bookmark.tags.filter(tag =>
      !hideTags.includes(tag.toLowerCase())
    );
  });

  return filtered;
}

// Return a promise for the bookmarks starting with the given page of bookmarks.
// If we get a full page of bookmarks back, recursively request the remaining
// pages of bookmarks and return the combined result. If we get less than a full
// page of bookmarks, return that set (which may be empty). The result is that
// we sequentially fetch all pages and return the combined set.
//
// NOTE: Raindrop has, on at least one occasion, reduced the number of results
// returned per page (from 40 to 25). If they do that again, our logic is such
// that we'd only return the first page of bookmarks requested. If we wanted to
// be more thorough, we could keep requesting pages until a request returned
// zero results -- but that would add an extra fetch, and this sequential
// routine is already slow.
async function getBookmarkStartingFromPage(topic, pageNumber) {
  const escapedTopic = encodeURIComponent(topic);
  const url = `${RAINDROP_REST_URL}?search=[{"key":"tag","val":"${escapedTopic}"}]&perpage=${MAX_BOOKMARKS_PER_PAGE}&page=${pageNumber}`;
  console.log(`Bookmarks: ${url}`);
  const response = await fetch(url);
  const results = await response.json();
  const bookmarks = results && results.items;
  const bookmarkCount = bookmarks ? bookmarks.length : 0;
  if (bookmarkCount < MAX_BOOKMARKS_PER_PAGE) {
    // No more results.
    return bookmarks;
  } else {
    // Get remaining results and add them to our set.
    const remainingBookmarks = await getBookmarkStartingFromPage(topic, pageNumber + 1);
    return bookmarks.concat(remainingBookmarks);
  }
}

// Return the latest bookmarks, up to a maximum of count (but no more than 40).
// The default count is 10.
function mostRecentBookmarks(count = 10) {
  const url = `${RAINDROP_REST_URL}?perpage=${count}`;
  console.log(`Latest bookmarks: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    const filtered = filterBookmarks(json.items);
    // As of 7 Aug 2017, Raindrop seems to ignore the perpage parameter, and
    // returns more results than requested. Truncate to the number of results we
    // actually want.
    const constrained = filtered.slice(0, count);
    return constrained;
  });
}


module.exports = {
  bookmarksForTopic,
  mostRecentBookmarks
};
