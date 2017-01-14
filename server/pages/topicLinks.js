const bookmarks = require('../connectors/bookmarks');


/*
 * Given a topic, renders a promise to render the bookmarks tagged with that
 * topic as HTML links.
 */
module.exports = (topic) => {
  return bookmarks.bookmarksForTopic(topic)
  .then(bookmarks => {
    const links = bookmarks.map(bookmark => formatLinkForBookmark(bookmark, topic));
    const linksHtml = links.join('\n');
    return `<table class="topicLinks">
      ${linksHtml}
    </table>`;
  });
};


// Format a bookmark from the server as HTML for presentation to the user.
function formatLinkForBookmark(bookmark, topic) {

  let domain = bookmark.domain;
  if (domain.startsWith('www.')) {
    domain = domain.slice(4); // Remove "www."
  }

  // Our bookmark format has writers put the date of an event in the bookmark
  // title. Parse that out.
  const { date, text } = parseLinkTitle(bookmark.title);

  // Construct list of all bookmark tags except the one matching the topic.
  const tags = bookmark.tags
      .filter(tag => tag !== topic)
      .map(tag => `<a href="/reference/${tag}">${tag}</a>`);
  let tagsHtml = tags.join(', ');
  if (tagsHtml.trim().length > 0) {
    tagsHtml = `(See also ${tagsHtml})`;
  }

  // The bookmark may have an optional description ("excerpt").
  const excerpt = bookmark.excerpt ?
    `<br><div class="excerpt">${bookmark.excerpt}</div>` :
    '';

  return `<tr>
    <td>${date}</td>
    <td>
      ${text}
      <a href="${bookmark.link}">${domain}</a>
      ${tagsHtml}
      ${excerpt}
    </td>
  </tr>`;
}

function parseLinkTitle(title) {
  // Find link parts:
  // * optional whitespace to start
  // * date in 2017.01.17 format, can also use hyphens
  // * whitespace
  // * remaining text
  const linkPartsRegex = /^\s*([\d\.-]+)\s+(.*)/;
  const match = linkPartsRegex.exec(title);
  let date;
  let text;
  if (match) {
    date = match[1];
    text = match[2];
  } else {
    date = '';
    text = title;
  }
  return { date, text };
}
