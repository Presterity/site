/*
 * Returns a set of breadcrumb links for a page's ancestors.
 */

const wiki = require('../connectors/wiki');


module.exports = (ancestors) => {
  const breadcrumbs = ancestors.map(ancestor => {
    const title = ancestor.title;
    const siteUrl = wiki.pageTitleToSiteUrl(title);
    return `<a href="${siteUrl}">${title}</a>`;
  });
  return breadcrumbs.join(' / ');
};
