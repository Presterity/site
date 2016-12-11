module.exports = (request, data) =>
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${data.title} – Presterity</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Cabin">
    <style>
      body {
        color: #424242;
        font-family: "Cabin", Helvetica, Arial, sans-serif;
        font-size: 16px;
        line-height: 1.7em;
        margin: 8px;
      }

      .main {
        margin: 0 auto;
        max-width: 1024px;
      }

      .pageTitle {
        color: black;
        font-size: 2.5em;
        margin: 1em 0;
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
    </style>
  </head>
  <body>
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
