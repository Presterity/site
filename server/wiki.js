/*
 * The site's connection to, and represetation of, the Atlassian Confluence wiki.
 */


 const BASE_URL = 'https://presterity.atlassian.net';


// Map certain wiki page titles -> site URLs by hand.
const mapPageTitleToSiteUrl = {
  'About': '/About',
  'Development+volunteers': '/Volunteering/Development+volunteers',
  'Home': '/',
  'Submissions': '/Submissions',
  'Volunteering': '/Volunteering',
  'Code+of+Conduct': '/Volunteering/Code+of+Conduct'
};

function escapePageTitle(title) {
  return title.replace(' ', '+');
}


module.exports = {

  baseUrl: BASE_URL,

  escapePageTitle: escapePageTitle,

  /*
   * Return the site URL for the label page for the given label.
   */
  labelToSiteUrl(label) {
    // Use hand-mapped URL if it exists.
    return `/reference/label/${label}`;
  },

  /*
   * Return the site URL for the regular page with the given title.
   */
  pageTitleToSiteUrl(title) {
    // Use hand-mapped URL if it exists.
    // All other pages are presented in the "/reference" area of the site.
    const escaped = escapePageTitle(title);
    return mapPageTitleToSiteUrl[escaped] || `/reference/${escaped}`;
  },

  restUrl: `${BASE_URL}/wiki/rest/api/content?spaceKey=DB`,

  searchUrl: `${BASE_URL}/wiki/rest/api/content/search?spaceKey=DB`

};
