const wiki = require('../connectors/wiki');


/*
 * Format Atlassian Confluence CQL search results as a bulleted list of
 * clickable links.
 */
module.exports = (results) => {
  const links = results.map(result => {
    const title = result.title;
    const escaped = wiki.escapePageTitle(title);
    return `<li><a href="/reference/${escaped}">${title}</a></li>`;
  });
  const linksText = links.join('');
  return `<ul>${linksText}</ul>`;
};
