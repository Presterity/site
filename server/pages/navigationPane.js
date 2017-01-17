const cheerio = require('cheerio');
const fetch = require('node-fetch');
const wiki = require('../connectors/wiki');


/*
 * Return a promise for the HTML that should be used in the navigation pane.
 *
 * The content for the pane is maintained on a special page on the wiki with
 * the title "Navigation". That page isn't directly accessible through the
 * site navigation, and is only used here to construct the navigation UI.
 */
module.exports = () => {
  const title = 'Navigation';
  const query = `${wiki.restUrl}?spaceKey=DB&title=${title}&expand=body.view`;
  console.log(`Navigation: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(wikiResults => {
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
};
