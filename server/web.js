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

/* Serve wiki page */
app.get('/*', (request, response) => {
  wikiPage(request)
  .then(result => {
    response.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
