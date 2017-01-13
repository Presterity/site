const pageTemplate = require('./pageTemplate');

/*
 * Return a promise for the HTML for a "Not Found" page.
 */
module.exports = (request, topic) => {

  const data = {
    body: `
      <p>
        We don&rsquo;t have a page for &ldquo;${topic}&rdquo; yet!
      </p>
      <p>
        Would you consider
        <a href="/Volunteering">volunteering</a>
        and helping us make one?
      </p>
    `,
    head: `
      <style>
      .pageTitle {
        color: #bbb;
      }
      </style>
    `,
    heading: `${topic}`
  };

  return pageTemplate(request, data);

};
