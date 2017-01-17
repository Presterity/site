const cheerio = require('cheerio');
const fetch = require('node-fetch');
const wiki = require('../connectors/wiki');


// Time in milliseconds we should cache the navigation.
const NAVIGATION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// The Date.now() timestamp of our last request for the navgation.
let navigationTimestamp = 0;

// The cached navigation HTML.
let cachedNavigationHtml;


/*
 * Return a promise for the HTML that should be used in the navigation pane.
 *
 * The content for the pane is maintained on a special page on the wiki with
 * the title "Navigation". That page isn't directly accessible through the
 * site navigation, and is only used here to construct the navigation UI.
 *
 * Because the navigation outline doesn't change often, we cache the result for
 * a period before asking for it again. The same navigation pane is shared
 * across all pages that use the pane.
 */
module.exports = () => {
  const needsRefresh = cachedNavigationHtml == null ||
      (Date.now() - navigationTimestamp) > NAVIGATION_CACHE_DURATION;
  if (needsRefresh) {
    // Get navigation from server.
    return getNavigationFromWiki()
    .then(html => {
      cachedNavigationHtml = html;
      return html;
    });
  } else {
    // Return cached result.
    return Promise.resolve(cachedNavigationHtml);
  }
};


// Returns a promise to get the navigation HTML from the wiki.
function getNavigationFromWiki() {
  const title = 'Navigation';
  const query = `${wiki.restUrl}?spaceKey=DB&title=${title}&expand=body.view`;
  console.log(`Navigation: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(wikiResults => {
    navigationTimestamp = Date.now(); // Note the time we got this response.

    const wikiPageJson = wikiResults.results[0];
    const body = wikiPageJson.body.view.value;

    // Map wiki-relative URLs to our own routes.
    const rewrittenHtml = wiki.rewriteHtml(body);

    // For each list item in the navigation pane, add an attribute on it that
    // will help us reflect the user's current position in the outline using
    // styling applied with CSS that matches that attribute. The goal of this
    // is to avoid having to update the navigation links for individual pages.
    const $ = cheerio.load(rewrittenHtml); // Parse HTML
    // Find all list items.
    $('li').each((index, li) => {
      const $li = $(li); // Get list item.
      const $a = $($li.children('a')[0]); // Get the anchor tag within it.
      if ($a) {
        // Get the anchor's text. This will be the page title.
        const text = $a.text();
        // Expose that text on the list item as an attribute.
        $li.attr('navigation-item', text);
      }
    });

    const navigationPaneHtml = $.html();
    return navigationPaneHtml;
  });
}