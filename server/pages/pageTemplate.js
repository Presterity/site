/*
 * Main page template for all web site pages.
 */

const fs = require('fs');
const path= require('path');
const promisify = require('../promisify');
const readFilePromise = promisify(fs.readFile);

const breadcrumbLinks = require('./breadcrumbLinks');
const daysRemaining = require('./daysRemaining');


// Load includes which are broken out into separate files for easier editing.
let analytics;
const loadFiles = fileContents('analytics.html')
.then(result => {
  analytics = result;
});
// const loadFiles = Promise.resolve();


/*
 * Return a promise for HTML that renders the given data using the site's
 * default page template.
 *
 * This waits for initialization to be complete before return its work.
 * The `loadFiles` promise will only need to do its work the first time it's
 * invoked, and thereafter return immediately.
 */
module.exports = (request, data) => loadFiles.then(() => {

  // Pick defaults for any values not specified in data.
  const ancestors = data.ancestors || [];
  const area = data.area || '';
  const body = data.body || '';
  const footer = data.footer || '';
  const head = data.head || '';
  const heading = data.heading || data.title || '';
  const navigation = data.navigation || '';
  const title = data.title ?
    data.title :
    data.heading ?
      `${data.heading} - Presterity` :
      '';

  const breadcrumbs = breadcrumbLinks(ancestors);
  const daysRemainingMessage = daysRemaining();

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/static/main.css">
        <link rel="shortcut icon" href="/static/presterity.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
        <link rel="manifest" href="/static/manifest.json">
        <meta name="google-site-verification" content="4TmUwdRDIEbTE65Bw8HwEyVZqJthy2MvT0S327h_Gdg" />
        <script src="/static/client.js" async></script>
        ${analytics}
        ${head}
      </head>
      <body area="${area}" page="${heading}">
        <nav class="sideNavigation">
          <div id="logoBlock">
            <a id="linkHome" href="/">
              <img id="logo" src="/static/presterity.png" alt="Presterity">
            </a>
          </div>
          <p id="tableOfContentsCaption">
            TABLE <em>of</em> CONTENTS
          </p>
          <div id="captionSeparatorContainer">
            <div id="captionSeparator"></div>
          </div>
          ${navigation}
        </nav>
        <div class="main">
          <header id="topNavigation">
            <div class="gutter"></div>
            <div id="topLinks">
              <a id="linkAbout" href="/About">ABOUT THIS PROJECT</a>
              <a id="linkVolunteering" href="/Volunteering">VOLUNTEER</a>
              <a id="linkSearch" href="/search">SEARCH</a>
              <a id="linkSubmissions" href="/Submissions">SUBMIT NEWS</a>
            </div>
            <div class="gutter"></div>
          </header>
          <div class="breadcrumbBar">
            <div class="gutter"></div>
            <div class="breadcrumbs">${breadcrumbs}</div>
            <div class="gutter"></div>
          </div>
          <div class="articleContainer">
            <div class="gutter"></div>
            <article class="wikiContent">
              <h1 class="pageTitle">${heading}</h1>
              <div>
                ${body}
              </div>
              <footer>
                <p id="daysRemainingMessage">
                  ${daysRemainingMessage}
                </p>
                ${footer}
              </footer>
            </article>
            <div class="gutter"></div>
          </div>
        </div>
      </body>
    </html>`;
});


// Return a promise for contents of the file with the indicated relative path.
function fileContents(relativePath) {
  const absolutePath = path.join(__dirname, relativePath);
  return readFilePromise(absolutePath)
  .then(buffer => buffer.toString());
}
