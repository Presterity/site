const components = require('../dist/server');
const h = require('preact').h;
const routesToComponentsMap = components.routes;
const render = require('preact-render-to-string');
const Route = require('route-parser');


/*
 * Return a promise to render an HTML response for the given Express request.
 *
 * See if that route can be handled by one of our React components and, if so,
 * use the component to render the HTML response. If the request can't be
 * handled, return null.
 *
 */
function renderReactRoute(request) {

  const page = matchRoute(request);
  if (!page) {
    // Route wasn't found.
    return Promise.resolve(null);
  }

  // Construct the properties that will be used to initially instantiated the
  // component. This includes the request object. Also, our pages generally want
  // to have the URL (and, occasionally, base URL) available in fully qualified
  // form.
  const baseUrl = `https://${request.hostname}`;
  const initialProps = {
    baseUrl: baseUrl,
    url: `${baseUrl}${request.url}`,
    request: request
  };

  // Instantiate the component for the page.
  const instance = new page(initialProps);

  // Now that the component knows what's being asked of it, evaluate its async
  // properties (if any).
  const promise = instance.asyncProperties || Promise.resolve();
  return promise.then(asyncProps => {

    // Combine the async properties with the initial properties and render.
    const props = Object.assign({}, initialProps, asyncProps);
    const pageContent = instance.render(props);

    // Render the shell for the HTML page.
    // The shell needs the page's title, so grab that from the page instance.
    const shellProps = Object.assign({}, initialProps, {
      title: instance.title
    });
    const rendered = render(h(components.AppShell, shellProps, pageContent));

    // Prepend DOCTYPE processing instruction, which React can't render.
    const html = `<!DOCTYPE html>${rendered}`;
    return html;
  });

}

/*
 * See if we have a route that matches the given request.
 *
 * If found, destructively update the request's params object with the
 * substitutions necessary to make the route match, then return the component
 * that should be used to render that route.
 *
 * If no route matches, return null.
 */
function matchRoute(request) {
  const url = request.url;
  for (let routePath in routesToComponentsMap) {
    const route = new Route(routePath);
    const params = route.match(url);
    if (params) {
      Object.assign(request.params, params);
      const component = routesToComponentsMap[routePath];
      return component;
    }
  }
  return null;
}


module.exports = renderReactRoute;
