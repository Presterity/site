const breadcrumbs = require('./breadcrumbs');
const fetch = require('node-fetch');
const pageTemplate = require('./pageTemplate');
const wiki = require('../wiki');

/*
 * Return a formatted version of the wiki page indicated by the given HTTP
 * request.
 */
module.exports = (request) => {

  const title = request.params.title;
  const query = `${wiki.restUrl}?spaceKey=DB&title=${title}&expand=space,ancestors,body.view`;

  console.log(`Page: ${query}`);
  return fetch(query)
  .then(response => response.json())
  .then(json => {
    const result = json.results instanceof Array ? json.results[0] : json;
    const area = result.ancestors[0] ?
      result.ancestors[0].title :
      result.title;
    const data = {
      area: area,
      breadcrumbs: breadcrumbs(result.ancestors),
      body: wiki.rewriteHtml(result.body.view.value),
      title: result.title
    };
    return pageTemplate(request, data);
  });
};
