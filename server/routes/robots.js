/*
 * Return a simple robots.txt that allows full access to everything.
 */
module.exports = (request) => `
  Sitemap: https://presterity.org/sitemap.xml
  User-agent: *
  Disallow:
`;
