const wiki = require('../wiki');

module.exports = (ancestors) => {
  const breadcrumbs = ancestors.map(ancestor => {
    const title = ancestor.title;
    const escaped = title.replace(' ', '+');
    const siteUrl = wiki.pageTitleToSiteUrl(escaped);
    return `<a href="${siteUrl}">${title}</a>`;
  });
  return breadcrumbs.join(' / ');
};
