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

const wiki = require('./connectors/wiki');

const render = require('preact-render-to-string');
const h = require('preact').h;
const components = require('../dist/server');
const newRoutes = components.routes;

// const errorPage = require('./pages/errorPage');
const homePage = require('./pages/homePage');
const robots = require('./pages/robots');
const searchPage = require('./pages/searchPage');
const sitemap = require('./pages/sitemap');
const wikiLabelPage = require('./pages/wikiLabelPage');
const wikiPage = require('./pages/wikiPage');
const wikiResource = require('./pages/wikiResource');

const CACHE_MAX_AGE_SECONDS = 300; // Cache for 5 minutes
const CACHE_CONTROL_VALUE = `public,max-age=${CACHE_MAX_AGE_SECONDS}`;

//
// General route handlers, which map a route to a function that returns the
// body of the response.
//
const routes = {
  // '/error': errorPage,
  '/reference/label/:label': wikiLabelPage,
  '/robots.txt': robots,
  '/search': searchPage,
  '/sitemap.xml': sitemap,
  '/:title': wikiPage,
  '/:area/:title': wikiPage,
  '/': homePage
};


// Tell Express to serve up static content from the ./static folder.
const staticPath = path.join(__dirname, 'static');
app.use('/static', express.static(staticPath, {
  maxAge: CACHE_MAX_AGE_SECONDS * 1000 // Convert to milliseconds
}));

//
// Specialized route handlers.
//

app.get('*', (request, response, next) => {
  const page = newRoutes[request.url];
  if (!page) {
    next();
    return;
  }
  const baseUrl = `https://${request.hostname}`;
  const url = `${baseUrl}${request.url}`;
  const defaultProps = {
    ancestors: [{ title: 'Home' }],
    baseUrl: baseUrl,
    url: url
  };
  const promise = page.asyncProperties || Promise.resolve();
  promise.then(asyncProps => {
    const props = Object.assign({}, defaultProps, asyncProps);
    const instance = new page(props);
    console.log(instance.title);
    const title = instance.title;
    const shellProps = { baseUrl, title, url };
    const pageContent = instance.render(props);
    const rendered = render(h(components.AppShell, shellProps, pageContent));
    const html = `<!DOCTYPE html>${rendered}`;
    response.set({
      'Content-Type': 'text/html'
    });
    response.send(html);
  });

});

// Serve an image or other page attachment from the wiki.
app.get('/wiki/download/*', (request, response) => {
  wikiResource(request)
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

// Redirect pages by ID to their title equivalent.
// There are cases where a wiki page link will refer to a page by ID.
// This seems to happen if the wiki page title includes punctuation.
app.get('/reference/id/:pageId', (request, response) => {
  redirectIdToTitle(request, response);
});

// Top-level of reference redirects to site home page.
app.get('/reference/', (request, response) => {
  response.redirect('/');
});

//
// Wire up general route handlers.
//
for (let route in routes) {
  const renderFunction = routes[route];
  app.get(route, (request, response) => {
    renderResponse(request, renderFunction, response);
  });
}



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
  wiki.getTitleForPageWithId(pageId)
  .then(title => {
    console.log(`Redirecting page by ID ${pageId} to title "${title}"`);
    const url = `/reference/${title}`;
    response.redirect(url);
  })
  .catch(exception => {
    log(exception);
  });
}

// Handle a web request by returning an instance of the indicated page.
function renderResponse(request, page, response) {
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
      renderResponse(request, errorPage, response);
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
