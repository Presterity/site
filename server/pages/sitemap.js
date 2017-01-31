/**
 * Return a simple sitemap.xml.
 *
 * This just returns the top-level pages, as the rest of the publicly-visible
 * site is crawlable from links on those pages.
 */
module.exports = (request) =>
  `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${request.protocol}://${request.headers.host}</loc>
      <changefreq>daily</changefreq>
    </url>
    <url><loc>${request.protocol}://${request.headers.host}/About</loc></url>
    <url><loc>${request.protocol}://${request.headers.host}/Volunteering</loc></url>
    <url><loc>${request.protocol}://${request.headers.host}/Submissions</loc></url>
  </urlset>`;
