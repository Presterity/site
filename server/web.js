const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const fetch = require('node-fetch');
const wiki = require('./wiki');
const wikiPage = require('./pages/wikiPage');

/* Serve up static content from ./static folder. */
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath));

/* Serve wiki download (attachment) */
app.get('/wiki/download/*', (request, response) => {
  const url = `${wiki.baseUrl}${request.url}`;
  console.log(`Download: ${url}`);
  fetch(url)
  .then(result => result.buffer())
  .then(buffer => response.send(buffer));
});

/* Reference page */
app.get('/reference/:title', (request, response) => {
  respondWithWikiPage(request, response);
});

/* Top-level of reference redirects to site home page. */
app.get('/reference', (request, response) => {
  response.redirect('/');
});

/* Serve other top-level page */
app.get('/:title', (request, response) => {
  respondWithWikiPage(request, response);
});

/* Serve up home page */
app.get('/', (request, response) => {
  request.params.title = 'Home';
  respondWithWikiPage(request, response);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


// Handle a web request by returning a wiki page.
function respondWithWikiPage(request, response) {
  // Render the request as content, or a promise for content.
  let result = wikiPage(request);
  // If the result's not already a promise, cast it to a promise.
  Promise.resolve(result)
  .then(content => {
    // Return the content as the response.
    response.set({
      'Cache-Control': 'public,max-age=300', // Cache for 5 minutes
      'Content-Type': inferContentType(content)
    });
    response.send(content);
  });
}

// Given textual content to return, infer its Content-Type.
function inferContentType(content) {
  if (content.startsWith('<!DOCTYPE html>')) {
    return 'text/html';
  } else if (content.startsWith('<?xml')) {
    return 'text/xml';
  } else if (content.startsWith('{')) {
    return 'application/json';
  } else {
    return 'text/plain';
  }
}
