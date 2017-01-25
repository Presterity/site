const bookmarks = require('../connectors/bookmarks');
const bookmarkLink = require('./bookmarkLink');


/*
 * Given a topic, renders a promise to render the bookmarks tagged with that
 * topic as HTML links.
 */
module.exports = (topic) => {
  return bookmarks.bookmarksForTopic(topic)
  .then(bookmarks => {
    const links = bookmarks.map(bookmark => bookmarkLink(bookmark, topic));
    const linksHtml = links.join('\n');
    return `<table class="topicLinks">
      ${linksHtml}
    </table>`;
  });
};
