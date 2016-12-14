module.exports = (ancestors) => {
  const breadcrumbs = ancestors.map(ancestor => {
    const title = ancestor.title;
    const escaped = title.replace(' ', '+');
    const url = title === 'Home' ? '/' : `/reference/${escaped}`;
    return `<a href="${url}">${title}</a>`;
  });
  return breadcrumbs.join(' / ');
};
