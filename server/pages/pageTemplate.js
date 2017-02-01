/*
 * Main page template for all web site pages.
 */

const fs = require('fs');
const navigationPane = require('./navigationPane');
const path= require('path');
const promisify = require('../promisify');
const readFilePromise = promisify(fs.readFile);
const tweetButton = require('./tweetButton');

const breadcrumbLinks = require('./breadcrumbLinks');
const daysRemaining = require('./daysRemaining');


// Load includes which are broken out into separate files for easier editing.
let analytics;
const loadFiles = fileContents('analytics.html')
.then(result => {
  analytics = result;
});


/*
 * Return a promise for HTML that renders the given data using the site's
 * default page template.
 *
 * This waits for initialization to be complete before return its work.
 * The `loadFiles` promise will only need to do its work the first time it's
 * invoked, and thereafter return immediately.
 */
module.exports = (request, data) => loadFiles
  .then(() => navigationPane())
  .then(navigation => {

  // Pick defaults for any values not specified in data.
  const area = data.area || '';
  const body = data.body || '';
  const footer = data.footer || '';
  const head = data.head || '';
  const heading = data.heading || data.title || '';
  const title = data.title ?
    data.title :
    data.heading ?
      `${data.heading} - Presterity` :
      '';

  // Pages without ancestors should at least show Home as a breadcrumb so mobile
  // users have a way to get back to Home.
  const ancestors = data.ancestors || [{ title: 'Home' }];
  const breadcrumbs = breadcrumbLinks(ancestors);

  const daysRemainingMessage = daysRemaining();

  const baseUrl = `${request.protocol}://${request.headers.host}`;
  const url = `${baseUrl}${request.url}`;
  const tweetHtml = tweetButton(`${heading}`, url);

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="/static/main.css">
        <script src="/static/client.js" async></script>
        <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
        <link rel="manifest" href="/static/manifest.json">
        <meta name="google-site-verification" content="4TmUwdRDIEbTE65Bw8HwEyVZqJthy2MvT0S327h_Gdg" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${baseUrl}/static/facebookShare.png" />
        ${analytics}
        ${head}
      </head>
      <body area="${area}" page="${heading}">
        <nav class="sideNavigation">
          <div id="logoBlock">
            <a id="linkHome" href="/">
              <img id="logo" src="/static/presterity.png" alt="Presterity logo: a torch and a book">
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
              <a id="linkAbout" href="/About">ABOUT</a>
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
              <img id="mobileHomeLogo" src="/static/appIcon.png" alt="Presterity logo: a torch and a book">
              <h1 class="pageTitle">${heading}</h1>
              <div>
                ${body}
              </div>
              <footer>
                <p>${tweetHtml}</p>
                ${footer}
                <p id="daysRemainingMessage">
                  ${daysRemainingMessage}
                </p>
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
