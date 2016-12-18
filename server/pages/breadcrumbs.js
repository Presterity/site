const mapPageUrl = require('./mapPageUrl');

module.exports = (ancestors) => {
  const breadcrumbs = ancestors.map(ancestor => {
    const title = ancestor.title;
    const escaped = title.replace(' ', '+');
    const wikiUrl = `/${escaped}`;
    const siteUrl = mapPageUrl.wikiToSiteUrl(wikiUrl);
    return `<a href="${siteUrl}">${title}</a>`;
  });
  return breadcrumbs.join(' / ');
};
