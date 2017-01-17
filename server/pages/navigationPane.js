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
    const navigationPaneHtml = wikiPageJson.body.view.value;
    return navigationPaneHtml;
  });
};
