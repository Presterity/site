const bookmarks = require('../connectors/bookmarks');
const bookmarkLink = require('./bookmarkLink');


/*
 * Return a promise for a list of links for the most recent bookmarks.
 */
module.exports = () => {
  const requestBookmarkCount = 5;
  return bookmarks.mostRecentBookmarks(requestBookmarkCount)
  .then(bookmarks => {
    const links = bookmarks.map(bookmark => bookmarkLink(bookmark));
    const linksHtml = links.join('\n');
    return `<table class="topicLinks">
      ${linksHtml}
    </table>`;
  });
};
