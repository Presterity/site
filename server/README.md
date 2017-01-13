The server is about as simple as it can get these days.

Express is used as the server foundation, and maps routes to `request` objects.

Instead of using a proprietary template language (e.g., Jade), this server takes
a more functional approach. Most of the UI is constructed by functions that take
an Express `request` and a promise for a text string containing HTML. Express
then serves that HTML as the `response` to the client.

For more details on this approach, see
[Replacing your server-side template language with plain JavaScript functions](https://component.kitchen/blog/posts/replacing-your-server-side-template-language-with-plain-javascript-functions).
