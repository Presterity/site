const fetch = require('node-fetch');
const wiki = require('../wiki');
const wikiRestUrl = `${wiki.baseUrl}/wiki/rest/api/content?spaceKey=DB&expand=space,ancestors,body.view`;
const pageTemplate = require('./pageTemplate');
const breadcrumbs = require('./breadcrumbs');


module.exports = (request) => {
  let title = request.url.substr(1); // Strip leading slash.
  if (title === '') {
    title = 'Home';
  }
  const url = `${wikiRestUrl}&title=${title}`;
  console.log(`Page: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    const result = json.results[0];
    const area = result.ancestors[0] ?
      result.ancestors[0].title :
      result.title;
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(result.ancestors),
      body: adjustRelativeUrls(result.body.view.value),
      title: result.title
    };
    return pageTemplate(request, data);
  });
};

// Replace relative URLs on Atlassian with corresponding URLs on the site.
function adjustRelativeUrls(html) {
  const relativeUrlRegex = /\/wiki\/display\/DB\//g;
  return html.replace(relativeUrlRegex, '/');
}
