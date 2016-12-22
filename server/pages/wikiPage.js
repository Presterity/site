const breadcrumbs = require('./breadcrumbs');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const wiki = require('../wiki');

/*
 * Return a formatted version of the wiki page indicated by the given HTTP
 * request.
 */
module.exports = (request) => {
  const title = request.params.title;
  const query = `${wiki.restUrl}&expand=space,ancestors,body.view&title=${title}`;
  console.log(`Page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => {
    const result = json.results[0];
    const area = result.ancestors[0] ?
      result.ancestors[0].title :
      result.title;
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(result.ancestors),
      body: rewriteUrls(result.body.view.value),
      title: result.title
    };
    return pageTemplate(request, data);
  });
};


// Replace links to label pages with equivalent site URLs.
const labelUrlRegex = new RegExp(`${wiki.baseUrl}/wiki/label/DB/([^"]+)`);

// Replace links to regular pages with equivalent site URLs.
const pageUrlRegex = new RegExp(`/wiki/display/DB/([^"]+)`);

// Rewrite the indicated attribute of the given element if necessary.
function rewriteElementAttribute($element, attributeName) {

  const attributeValue = $element.attr(attributeName);

  const labelUrlMatch = labelUrlRegex.exec(attributeValue);
  if (labelUrlMatch) {
    const label = labelUrlMatch[1];
    const rewritten = wiki.labelToSiteUrl(label);
    $element.attr(attributeName, rewritten);
    return; // No more processing necessary.
  }

  const pageUrlMatch = pageUrlRegex.exec(attributeValue);
  if (pageUrlMatch) {
    const title = pageUrlMatch[1];
    const rewritten = wiki.pageTitleToSiteUrl(title);
    $element.attr(attributeName, rewritten);
  }
}

// Rewrite URLs using Cheerio's jQuery-style parser/manipulator.
function rewriteUrls(html) {
  const $ = cheerio.load(html); // Parse HTML
  $('a[href]').each((index, element) => {
    rewriteElementAttribute($(element), 'href');
  });
  return $.html(); // Return rewritten HTML
}
