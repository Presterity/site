# Presterity server

The server is about as simple as it can get these days.

[Express](http://expressjs.com/) is used as the server foundation,
and maps routes to `request` objects.

Instead of using a proprietary template language
(e.g., [Pug](https://pugjs.org/) née Jade),
this server uses pure [ECMAScript 6](http://es6-features.org/) functions.
Most of the UI is constructed by functions that take an Express `request`
and a [promise](http://www.datchley.name/es6-promises/)
for a text string containing HTML.
Express then serves that HTML as the `response` to the client.

For more details on this approach, see
[Replacing your server-side template language with plain JavaScript functions](https://component.kitchen/blog/posts/replacing-your-server-side-template-language-with-plain-javascript-functions).

Good places to start reading:

* `app.js`: the main Express server.
* `pages/wikiPage.js`: serves up a wiki page in the site's
  [/reference](https://presterity.org/reference/) area.
* [Site Design](https://presterity.atlassian.net/wiki/display/PI/Site+Design)
