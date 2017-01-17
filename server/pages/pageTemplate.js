/*
 * Main page template for all web site pages.
 */

const breadcrumbLinks = require('./breadcrumbLinks');

module.exports = (request, data) => {

  // Pick defaults for any values not specified in data.
  const ancestors = data.ancestors || [{ title :'Home' }];
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

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${title}</title>
        <link rel="shortcut icon" href="/static/presterity.jpg" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
        <link rel="manifest" href="/static/manifest.json">
        <link rel="stylesheet" href="/static/main.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">
        ${head}
      </head>
      <body area="${area}">
        <nav class="sideNavigation">
          <div id="logoBlock">
            <a id="linkHome" href="/">
              <img id="logo" src="/static/presterity.jpg">
              <div>Presterity</div>
            </a>
          </div>
          <p>
            Table <em>of</em> Contents
          </p>
          ${navigation}
        </nav>
        <div class="main">
          <header id="topNavigation">
            <div id="links">
              <div id="areaLinks">
                <a id="linkSearch" href="/search">Search</a>
                <a id="linkSubmissions" href="/Submissions">Submit</a>
                <a id="linkVolunteering" href="/Volunteering">Volunteer</a>
                <a id="linkAbout" href="/About">About</a>
              </div>
            </div>
          </header>
          <p class="breadcrumbs">${breadcrumbs}</p>
          <div class="articleContainer">
            <div class="gutter"></div>
            <article class="wikiContent">
              <h1 class="pageTitle">${heading}</h1>
              <div>
                ${body}
              </div>
            </article>
          </div>
          <footer>${footer}</footer>
        </div>
      </body>
    </html>`;
};
