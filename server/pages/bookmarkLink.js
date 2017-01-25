/*
 * Return a bookmark from the server as HTML for presentation to the user.
 * This will be a row intended for display in a table.
 *
 * The result will include "See also" links to topics tagged on the bookmark.
 * The optional topic parameter indicates a general topic for the page on which
 * the bookmark will be display. If the topic parameter is supplied, a "See
 * also" link will *not* be included for that topic (since the user will
 * already be looking at that page).
 */
module.exports = (bookmark, topic) => {

  let domain = bookmark.domain;
  if (domain.startsWith('www.')) {
    domain = domain.slice(4); // Remove "www."
  }

  // Our bookmark format has writers put the date of an event in the bookmark
  // title. Parse that out.
  const { date, text } = parseLinkTitle(bookmark.title);

  // Construct list of bookmark tags.
  // If a current topic has been supplied, *don't* include that tag.
  // Otherwise, include all tags.
  const excludeCurrentTag = topic != null;
  const tags = bookmark.tags
      .filter(tag => tag !== topic)
      .map(tag => `<a href="/reference/${tag}">${tag}</a>`);
  let tagsHtml = tags.join(', ');
  if (tagsHtml.trim().length > 0) {
    const seeLabel = excludeCurrentTag ? 'See also' : 'See';
    tagsHtml = `(${seeLabel} ${tagsHtml})`;
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
};


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
