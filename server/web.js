/*
 * Express web server.
 *
 * This mostly just fronts the Atlassian Confluence wiki, presenting the wiki
 * content in a read-only format branded with the project's identity.
 */

const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const fetch = require('node-fetch');
const labelPage = require('./pages/labelPage');
const searchPage = require('./pages/searchPage');
const wiki = require('./wiki');
const wikiPage = require('./pages/wikiPage');

const CACHE_MAX_AGE_SECONDS = 300; // Cache for 5 minutes
const CACHE_CONTROL_VALUE = `public,max-age=${CACHE_MAX_AGE_SECONDS}`;


/* Serve up static content from ./static folder. */
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath, {
  maxAge: CACHE_MAX_AGE_SECONDS * 1000 // Convert to milliseconds
}));

/* Serve wiki download (attachment) */
app.get('/wiki/download/*', (request, response) => {
  const url = `${wiki.baseUrl}${request.url}`;
  console.log(`Download: ${url}`);
  fetch(url)
  .then(result => result.buffer())
  .then(buffer => {
    response.set({
      'Cache-Control': CACHE_CONTROL_VALUE
    });
    response.send(buffer);
  });
});

/* Top-level of reference redirects to site home page. */
app.get('/reference', (request, response) => {
  response.redirect('/');
});

/* Serve a search page. */
app.get('/search', (request, response) => {
  respondWithPage(request, searchPage, response);
});

/* Serve a top-level page, or page within a top-level area. */
app.get(['/:title', '/:area/:title'], (request, response) => {
  respondWithPage(request, wikiPage, response);
});

/* Serve a label page. */
app.get('/reference/label/:label', (request, response) => {
  respondWithPage(request, labelPage, response);
});

/* Serve up home page */
app.get('/', (request, response) => {
  request.params.title = 'Home';
  respondWithPage(request, wikiPage, response);
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});


// Handle a web request by returning an instance of the indicated page.
function respondWithPage(request, page, response) {
  // Render the request as page content, or a promise for content.
  const result = page(request);
  // If the result's not already a promise, cast it to a promise.
  Promise.resolve(result)
  .then(content => {
    // Return the content as the response.
    response.set({
      'Cache-Control': CACHE_CONTROL_VALUE,
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
