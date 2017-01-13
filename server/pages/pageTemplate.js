/*
 * Main page template for all web site pages.
 */

let fs = require('fs');
let path= require('path');
let promisify = require('../promisify');
let readFileAsync = promisify(fs.readFile);

// Load static includes.
// These let us keep things like CSS in separate files for easier editing.
let css;
const cssPromise = readStaticInclude('main.css').then(result => css = result);

module.exports = (request, data) => cssPromise.then(() =>
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>${data.title}</title>
      <link rel="shortcut icon" href="/static/presterity.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">
      <style>${css}</style>
    </head>
    <body area="${data.area}">
      <header id="navigation">
        <div id="links">
          <a href="/">
            <img id="logo" src="/static/presterity.jpg">
          </a>
          <div id="areaLinks">
            <a id="linkHome" href="/">Presterity</a>
            <a id="linkSearch" href="/search">Search</a>
            <a id="linkSubmissions" href="/Submissions">Submit</a>
            <a id="linkVolunteering" href="/Volunteering">Volunteer</a>
            <a id="linkAbout" href="/About">About</a>
          </div>
        </div>
      </header>
      <div class="main">
        <p class="breadcrumbs">${data.breadcrumbs}</p>
        <h1 class="pageTitle">${data.heading}</h1>
        <div>
          ${data.body}
        </div>
      </div>
      <footer>
        This work is licensed under a
        <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
      </footer>
    </body>
  </html>`
);


function readStaticInclude(relativePath) {
  const filePath = path.join(__dirname, relativePath);
  return readFileAsync(filePath);
}
