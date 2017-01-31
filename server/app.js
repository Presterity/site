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
const errorPage = require('./pages/errorPage');
const homePage = require('./pages/homePage');
const robots = require('./pages/robots');
const searchPage = require('./pages/searchPage');
const sitemap = require('./pages/sitemap');
const wiki = require('./connectors/wiki');
const wikiLabelPage = require('./pages/wikiLabelPage');
const wikiPage = require('./pages/wikiPage');

const CACHE_MAX_AGE_SECONDS = 300; // Cache for 5 minutes
const CACHE_CONTROL_VALUE = `public,max-age=${CACHE_MAX_AGE_SECONDS}`;


// Tell Express to serve up static content from the ./static folder.
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath, {
  maxAge: CACHE_MAX_AGE_SECONDS * 1000 // Convert to milliseconds
}));

//
// Route handlers.
// These should generally go from most- to least-specific routes.
//

// Serve an error page.
app.get('/error', (request, response) => {
  respondWithPage(request, errorPage, response);
});

// Top-level of reference redirects to site home page.
app.get('/reference', (request, response) => {
  response.redirect('/');
});

// Redirect pages by ID to their title equivalent.
// There are cases where a wiki page link will refer to a page by ID.
// This seems to happen if the wiki page title includes punctuation.
app.get('/reference/id/:pageId', (request, response) => {
  redirectIdToTitle(request, response);
});

// Serve a label page.
// Labels are tags on wiki pages. Certain wiki links will point to these.
app.get('/reference/label/:label', (request, response) => {
  respondWithPage(request, wikiLabelPage, response);
});

// Serve robots.txt
app.get('/robots.txt', (request, response) => {
  respondWithPage(request, robots, response);
});

// Serve a search page.
app.get('/search', (request, response) => {
  respondWithPage(request, searchPage, response);
});

// Serve sitemap.xml
app.get('/sitemap.xml', (request, response) => {
  respondWithPage(request, sitemap, response);
});

// Serve an image or other page attachment from the wiki.
app.get('/wiki/download/*', (request, response) => {
  const url = `${wiki.BASE_URL}${request.url}`;
  console.log(`Download: ${url}`);
  fetch(url)
  .then(result => result.buffer())
  .then(buffer => {
    response.set({
      'Cache-Control': CACHE_CONTROL_VALUE
    });
    response.send(buffer);
  })
  .catch(exception => {
    log(exception);
  });
});

// Serve a top-level page, or page within a top-level area.
app.get(['/:title', '/:area/:title'], (request, response) => {
  respondWithPage(request, wikiPage, response);
});

// Serve up home page
app.get('/', (request, response) => {
  respondWithPage(request, homePage, response);
});


//
// Helpers
//

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

// Redirect a request for a page by ID to a request for page by title.
function redirectIdToTitle(request, response) {
  const pageId = request.params.pageId;
  const query = `${wiki.REST_URL}/${pageId}`;
  return fetch(query)
  .then(response => response.json())
  .then(json => {
    const title = wiki.escapePageTitle(json.title);
    console.log(`Redirecting page by ID ${pageId} to title "${title}"`);
    const url = `/reference/${title}`;
    response.redirect(url);
  })
  .catch(exception => {
    log(exception);
  });
}

// Handle a web request by returning an instance of the indicated page.
function respondWithPage(request, page, response) {
  // Render the request as page content, or a promise for content.
  const result = page(request);
  // If the result's not already a promise, cast it to a promise.
  Promise.resolve(result)
  .then(content => {
    // Return the page content as the response.
    response.set({
      'Cache-Control': CACHE_CONTROL_VALUE,
      'Content-Type': inferContentType(content)
    });
    response.send(content);
  })
  .catch(exception => {
    log(exception);
    if (page !== errorPage) {
      respondWithPage(request, errorPage, response);
    }
  });
}

// Log an error message.
function log(exception) {
  console.log(`*** Exception: ${exception}`);
}


// Start the server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
