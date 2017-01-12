module.exports = (request, data) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${data.title}</title>
        <link rel="shortcut icon" href="/static/presterity.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,700">
        <style>
          body {
            color: #424242;
            line-height: 1.7em;
            margin: 0;
          }

          body,
          input,
          button {
            font-family: "Cabin", Helvetica, Arial, sans-serif;
            font-size: 16px;
          }

          .main {
            margin: 0 auto;
            max-width: 800px;
            padding: 12px 12px 100px 12px;
          }

          .pageTitle {
            color: black;
            font-size: 2.5em;
            margin: 1em 0;
          }

          footer {
            display: none;
            font-size: smaller;
            line-height: initial;
            margin: 0 auto;
            max-width: 800px;
            padding: 12px;
          }
          body[area="Home"] footer {
            display: block;
          }

          h1, h2, h3, h4, h5, h6 {
            line-height: initial;
          }

          a {
            color: #3572b0;
            text-decoration: none;
          }
          a:hover,
          a:focus {
            text-decoration: underline;
          }

          p {
            margin: 10px 0 0 0;
          }

          blockquote {
            border-left: 1px solid #ccc;
            color: #707070;
            margin-left: 19px;
            padding: 10px 20px;
          }

          iframe {
            border: none;
            max-width: 100%;
          }

          img {
            max-width: 100%;
          }

          #navigation {
            background: #666;
            padding: 6px 12px;
            text-transform: uppercase;
          }

          #navigation a {
            color: #eee;
          }
          #navigation a:hover,
          #navigation a:active {
            text-decoration: none;
          }

          #links {
            align-items: center;
            display: flex;
            flex-direction: row;
            margin: 0 auto;
            max-width: 800px;
            width: 100%;
          }

          #logo {
            display: block;
            height: 36px;
            width: 36px;
          }

          #areaLinks {
            flex: 1;
            padding: 6px 0 6px 12px;
          }
          #areaLinks > :not(:last-child) {
            margin-right: 20px;
          }

          body[area="Home"] #linkHome {
            color: white;
            font-weight: bold;
          }
          body[area="Search"] #linkSearch {
            color: white;
            font-weight: bold;
          }
          body[area="Submissions"] #linkSubmissions {
            color: white;
            font-weight: bold;
          }
          body[area="Volunteering"] #linkVolunteering {
            color: white;
            font-weight: bold;
          }
          body[area="About"] #linkAbout {
            color: white;
            font-weight: bold;
          }

          /* Topic links */
          table.topicLinks {
            font-size: 15px;
            line-height: 1.5em;
          }
          table.topicLinks td {
            padding-bottom: 0.5em;
          }
          table.topicLinks td:first-child {
            color: gray;
            padding-right: 1em;
            vertical-align: top;
            white-space: nowrap;
          }

          /* Tables */

          table.confluenceTable {
            border-collapse: collapse;
          }

          table.confluenceTable tr {
            border-bottom: 1px solid #d0d0d0;
          }

          th.confluenceTh {
            background: #eee;
            text-align: left;
          }

          th.confluenceTh > * {
            margin: 4px;
          }

          td.confluenceTd > * {
            margin: 0;
          }

          /* Hide boring macro output */
          .content-by-label > li > div {
            display: none; /* Hide most macro bulllet content */
          }
          .content-by-label > li > div.details {
            display: inherit; /* Just show the key bits */
          }
        </style>
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
    </html>
  `;
};
