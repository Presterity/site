const pageTemplate = require('./pageTemplate');

/*
 * Return a promise for the HTML for an error page.
 */
module.exports = (request) => {

  const data = {
    body: `
      Sorry, something went wrong. 😞
    `,
    heading: 'Oops',
    title: 'Oops - Presterity'
  };

  return pageTemplate(request, data);

};
