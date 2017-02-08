# Presterity server

[Express](http://expressjs.com/) is used as the server foundation, and maps
routes to `request` objects.

[Preact](https://github.com/developit/preact), a React variant, is used to
render responses for most routes.

Good places to start reading:

* `app.js`: the main Express server.
* `renderReactRoute.js`: renders a route with a React component.
* `/components/WikiPage.jsx`: React component to render a wiki page.
* [Site Design](https://presterity.atlassian.net/wiki/display/PI/Site+Design)
