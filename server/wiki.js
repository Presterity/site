/*
 * The site's connection to, and represetation of, the Atlassian Confluence wiki.
 *
 * The general principle is that this module isolates anything specific to
 * Confluence. If we were to change to a different wiki back-end, this module
 * would get replaced, but much of the rest of the server could stay the same.
 */


// Cheerio is a server-side HTML jQuery-style parser/manipulator.
const cheerio = require('cheerio');


const BASE_URL = 'https://presterity.atlassian.net';
const REST_URL = `${BASE_URL}/wiki/rest/api/content?spaceKey=DB`;
const SEARCH_URL = `${BASE_URL}/wiki/rest/api/content/search?cql=space=DB and `;

// Replace links to label pages with equivalent site URLs.
const labelUrlRegex = new RegExp(`${BASE_URL}/wiki/label/DB/([^"]+)`);

// Replace links to regular pages with equivalent site URLs.
const pageUrlRegex = new RegExp(`/wiki/display/DB/([^"]+)`);

// Map certain wiki page titles -> site URLs by hand.
const mapPageTitleToSiteUrl = {
  'About': '/About',
  'Development+volunteers': '/Volunteering/Development+volunteers',
  'Home': '/',
  'Submissions': '/Submissions',
  'Volunteering': '/Volunteering',
  'Code+of+Conduct': '/Volunteering/Code+of+Conduct'
};


/*
 * Format a page title for use in a wiki URL.
 */
function escapePageTitle(title) {
  return title.replace(/ /g, '+');
}

/*
 * Return the site URL for the label page for the given label.
 */
function labelToSiteUrl(label) {
  // Use hand-mapped URL if it exists.
  return `/reference/label/${label}`;
}

/*
 * Return the site URL for the regular page with the given title.
 */
function pageTitleToSiteUrl(title) {
  // Use hand-mapped URL if it exists.
  // All other pages are presented in the "/reference" area of the site.
  const escaped = escapePageTitle(title);
  return mapPageTitleToSiteUrl[escaped] || `/reference/${escaped}`;
}

/*
 * Rewrite the indicated attribute of the given element if necessary.
 */
function rewriteElementAttribute($element, attributeName) {

  const attributeValue = $element.attr(attributeName);

  const labelUrlMatch = labelUrlRegex.exec(attributeValue);
  if (labelUrlMatch) {
    const label = labelUrlMatch[1];
    const rewritten = labelToSiteUrl(label);
    $element.attr(attributeName, rewritten);
    return; // No more processing necessary.
  }

  const pageUrlMatch = pageUrlRegex.exec(attributeValue);
  if (pageUrlMatch) {
    const title = pageUrlMatch[1];
    const rewritten = pageTitleToSiteUrl(title);
    $element.attr(attributeName, rewritten);
  }
}

// Rewrite HTML for public consumption.
function rewriteHtml(html) {
  const $ = cheerio.load(html); // Parse HTML
  $('a[href]').each((index, element) => {
    rewriteElementAttribute($(element), 'href');
  });
  return $.html(); // Return rewritten HTML
}


module.exports = {
  baseUrl: BASE_URL,
  escapePageTitle: escapePageTitle,
  labelToSiteUrl: labelToSiteUrl,
  pageTitleToSiteUrl: pageTitleToSiteUrl,
  restUrl: REST_URL,
  rewriteHtml: rewriteHtml,
  searchUrl: SEARCH_URL
};
