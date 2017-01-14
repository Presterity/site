const wiki = require('../connectors/wiki');


/*
 * Given Atlassian Confluence search results, return them as a bulleted list of
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
