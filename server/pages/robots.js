/*
 * Return a simple robots.txt that allows full access to everything.
 */
module.exports = (request) => `
  Sitemap: ${request.protocol}://${request.headers.host}/sitemap.xml
  User-agent: *
  Disallow:
`;
