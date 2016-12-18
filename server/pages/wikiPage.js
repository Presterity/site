const fetch = require('node-fetch');
const wiki = require('../wiki');
const wikiRestUrl = `${wiki.baseUrl}/wiki/rest/api/content?spaceKey=DB&expand=space,ancestors,body.view`;
const pageTemplate = require('./pageTemplate');
const breadcrumbs = require('./breadcrumbs');
const mapPageUrl = require('./mapPageUrl');


module.exports = (request) => {
  let title = request.params.title;
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

// Find wiki URLs in HTML and replace them with equivalent site URLs.
function adjustRelativeUrls(html) {
  const wikiUrlRegex = /\/wiki\/display\/DB(\/[^"]+)/g;
  let result = html.replace(wikiUrlRegex, (match, wikiUrl) =>
      mapPageUrl.wikiToSiteUrl(wikiUrl));
  return result;
}
