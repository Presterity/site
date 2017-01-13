/*
 * Given a topic, renders a promise to render the bookmarks tagged with that
 * topic as HTML links.
 */


const bookmarks = require('../connectors/bookmarks');


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


function formatLinkForBookmark(bookmark, topic) {

  let domain = bookmark.domain;
  if (domain.startsWith('www.')) {
    domain = domain.slice(4); // Remove "www."
  }
  const { date, text } = parseLinkTitle(bookmark.title);

  // Construct list of all tags except the one matching the topic.
  const tags = bookmark.tags
      .filter(tag => tag !== topic)
      .map(tag => `<a href="/reference/${tag}">${tag}</a>`);
  let tagsHtml = tags.join(', ');
  if (tagsHtml.trim().length > 0) {
    tagsHtml = `(See also ${tagsHtml})`;
  }

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
  const linkPartsRegex = /([\d\.-]+) (.*)/;
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
