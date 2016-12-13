module.exports = (request, data) => {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>${data.title} – Presterity</title>
        <link rel="shortcut icon" href="/static/presterity.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin:400,700">
        <style>
          body {
            color: #424242;
            font-family: "Cabin", Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.7em;
            margin: 0;
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

          img {
            max-width: 100%;
          }

          #navigation {
            background: #666;
            padding: 6px;
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
            margin: 0 auto;
            max-width: 800px;
            width: 100%;
          }
          #areaLinks > :not(:last-child) {
            margin-right: 20px;
          }

          #linkHome {
            align-items: center;
            display: flex;
          }
          #logo {
            display: inline-block;
            height: 36px;
            margin: 6px;
            width: 36px;
          }
          #linkHome div {
            display: inline-block;
          }

          #areaLinks {
            padding: 6px;
          }

          body[area="Home"] #linkHome {
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

          #reference {
            display: none;
          }

          /* Desktop header */
          @media screen and (min-width: 800px) {
            #links {
              display: flex;
            }
            #linkHome {
              margin-right: 20px;
            }
            #reference {
              display: inline;
            }
          }
        </style>
      </head>
      <body area="${data.area}">
        <div id="navigation">
          <div id="links">
            <a id="linkHome" href="/">
              <img id="logo" src="/static/presterity.jpg">
              <div>Presterity<span id="reference"> Reference</span></div>
            </a>
            <div id="areaLinks">
              <a id="linkSubmissions" href="/Submissions">Submissions</a>
              <a id="linkVolunteering" href="/Volunteering">Volunteering</a>
              <a id="linkAbout" href="/About">About</a>
            </div>
          </div>
        </div>
        <div class="main">
          <p class="breadcrumbs">${data.breadcrumbs}</p>
          <h1 class="pageTitle">${data.title}</h1>
          <div>
            ${data.body}
          </div>
        </div>
      </body>
    </html>
  `;
};
