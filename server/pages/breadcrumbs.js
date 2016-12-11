module.exports = (ancestors) => {
  const breadcrumbs = ancestors.map(ancestor => {
    const title = ancestor.title;
    const escaped = title.replace(' ', '+');
    return `<a href="${escaped}">${title}</a>`;
  });
  return breadcrumbs.join(' / ');
};
