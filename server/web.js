console.log(`Starting server`);

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const fetch = require('node-fetch');

const wikiBaseUrl = `https://presterity.atlassian.net`;
const wikiRestUrl = `${wikiBaseUrl}/wiki/rest/api/content?spaceKey=DB&expand=space,ancestors,body.view`;

/* Wiki download (attachment) */
app.get('/wiki/download/*', (request, response) => {
  const url = `${wikiBaseUrl}${request.url}`;
  console.log(`Download: ${url}`);
  // TODO: This redirects to the wiki, which exposes an Atlassian URL.
  // Instead, we should get the data from the wiki and serve it ourselves.
  response.redirect(url);
});

/* Wiki page */
app.get('/*', (request, response) => {
  let title = request.url.substr(1); // Strip leading slash.
  if (title === '') {
    title = 'Home';
  }
  fetchWikiPageWithTitle(title)
  .then(result => {
    response.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

function fetchWikiPageWithTitle(title) {
  const url = `${wikiRestUrl}&title=${title}`;
  console.log(`Page: ${url}`);
  return fetch(url)
  .then(response => response.json())
  .then(json => {
    const result = json.results[0];
    const body = result.body.view.value;
    const adjusted = adjustRelativeUrls(body);
    return adjusted;
  });
}

// Replace relative URLs on Atlassian with corresponding URLs on the site.
function adjustRelativeUrls(html) {
  const relativeUrlRegex = /\/wiki\/display\/DB\//g;
  return html.replace(relativeUrlRegex, '/');
}
