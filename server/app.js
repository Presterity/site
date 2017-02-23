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

const wiki = require('../connectors/wiki');

const robots = require('./routes/robots');
const renderReactRoute = require('./renderReactRoute');
const sitemap = require('./routes/sitemap');
const wikiResource = require('./routes/wikiResource');

const CACHE_MAX_AGE_SECONDS = 300; // Cache for 5 minutes
const CACHE_CONTROL_VALUE = `public,max-age=${CACHE_MAX_AGE_SECONDS}`;


// Tell Express to serve up static content from the ./static folder.
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath, {
  maxAge: CACHE_MAX_AGE_SECONDS * 1000 // Convert to milliseconds
}));


//
// Specialized route handlers.
//

// Serve an image or other page attachment from the wiki.
app.get('/wiki/download/*', async (request, response) => {
  try {
    const buffer = await wikiResource(request);
    response.set({
      'Cache-Control': CACHE_CONTROL_VALUE
    });
    response.send(buffer);
  } catch(exception) {
    logException(exception);
  }
});

// Favicon.
app.get('/favicon.ico', (request, response) => {
  response.redirect('/static/favicon.ico');
});

// Redirect pages by ID to their title equivalent.
// If a wiki page title includes punctuation, links will refer to it by ID
// instead of by title.
app.get('/reference/id/:pageId', (request, response) => {
  redirectIdToTitle(request, response);
});

// Top-level of reference redirects to site home page.
app.get('/reference/', (request, response) => {
  response.redirect('/');
});

// Robots.txt
app.get('/robots.txt', (request, response) => {
  const text = robots(request);
  response.set({
    'Cache-Control': CACHE_CONTROL_VALUE,
    'Content-Type': 'text/plain'
  });
  response.send(text);
});

// Sitemap
app.get('/sitemap.xml', (request, response) => {
  const xml = sitemap(request);
  response.set({
    'Cache-Control': CACHE_CONTROL_VALUE,
    'Content-Type': 'text/xml'
  });
  response.send(xml);
});


//
// General route handler for pages that can be rendered by React components.
//
app.get('*', async (request, response, next) => {
  try {
    const html = await renderReactRoute(request);
    if (html) {
      response.set({
        'Cache-Control': CACHE_CONTROL_VALUE,
        'Content-Type': 'text/html'
      });
      response.send(html);
    } else {
      // We didn't have a React component for this route; shouldn't happen.
      next();
    }
  } catch(exception) {
    logException(exception);
    request.url = '/error';
    next();
  }
});

// Error handler.
app.get('/error', (request, response, next) => {
  // Don't catch exceptions.
  const html = renderReactRoute(request);
  if (html) {
    response.set({
      'Content-Type': 'text/html'
    });
    response.status(500);
    response.send(html);
  }
});


//
// Helpers
//

// Redirect a request for a page by ID to a request for page by title.
async function redirectIdToTitle(request, response) {
  try {
    const pageId = request.params.pageId;
    const title = await wiki.getTitleForPageWithId(pageId);
    console.log(`Redirecting page by ID ${pageId} to title "${title}"`);
    const url = `/reference/${title}`;
    response.redirect(url);
  } catch (exception) {
    logException(exception);
  }
}

// Log an error message.
function logException(exception) {
  console.log(`*** Exception: ${exception}`);
}


//
// Start the server
//
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
