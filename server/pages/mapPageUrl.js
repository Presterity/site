/*
 * Map between wiki URLs and site URLs.
 */


// Map certain wiki -> site URLs by hand.
const mapWikiToSiteUrl = {
  '/About': '/About',
  '/Development+volunteers': '/Volunteering/Development+volunteers',
  '/Home': '/',
  '/Submissions': '/Submissions',
  '/Volunteering': '/Volunteering',
  '/Code+of+Conduct': '/Volunteering/Code+of+Conduct'
};


module.exports = {

  wikiToSiteUrl: function(wikiUrl) {
    // Use hand-mapped URL if it exists.
    // All other pages are presented as if in a "/reference" area of the site.
    const result = mapWikiToSiteUrl[wikiUrl] || `/reference${wikiUrl}`;
    console.log(`mapped ${wikiUrl} to ${result}`);
    return result;
  }

};
