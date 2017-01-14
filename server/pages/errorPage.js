const pageTemplate = require('./pageTemplate');

/*
 * Return a promise for the HTML for an error page.
 *
 * This page is unusual in its simplicity. It doesn't use the usual template,
 * so it doesn't request any additional resources. It also makes no server calls
 * (e.g., to the wiki). This makes it a good page for testing basic server
 * functionality with as few variables as possible.
 */
module.exports = (request) => {

  const data = {
    body: `
      Sorry, something went wrong. 😞
    `,
    heading: 'Oops'
  };

  return pageTemplate(request, data);

};
