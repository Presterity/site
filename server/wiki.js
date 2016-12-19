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


module.exports = {

  baseUrl: BASE_URL,

  /*
   * Return an appropriate site URL for the page with the given title.
   */
  pageTitleToSiteUrl: function(title) {
    // Use hand-mapped URL if it exists.
    // All other pages are presented in the "/reference" area of the site.
    return mapPageTitleToSiteUrl[title] || `/reference/${title}`;
  },

  restUrl: `${BASE_URL}/wiki/rest/api/content?spaceKey=DB&expand=space,ancestors,body.view`

};
