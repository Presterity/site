import { Component, h } from 'preact'; // jshint ignore:line


export default class AppShell extends Component {

  render(props) {

    const titleBar =
      props.titleBar ||
      (props.title && `${props.title} - Presterity`) ||
      '';

    // JSX gets confused by JavaScript inside a script tag, so we define it as
    // as a string and inject it below.
    const analytics = `
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', 'UA-90582272-1', 'auto');
      ga('send', 'pageview');
    `;

    return (
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>{titleBar}</title>
          <link rel="stylesheet" href="/static/main.css"/>
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/appIcon.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="google-site-verification" content="4TmUwdRDIEbTE65Bw8HwEyVZqJthy2MvT0S327h_Gdg" />
          <meta property="og:title" content={props.title} />
          <meta property="og:url" content={props.url} />
          <meta property="og:image" content={`${props.baseUrl}/static/facebookShare.png`} />
          <script dangerouslySetInnerHTML={{ __html: analytics }}></script>
          <script async src='https://www.google-analytics.com/analytics.js'></script>
        </head>
        <body area={props.area}>
          <div id="root">
            {props.children}
          </div>
        </body>
      </html>
    );
  }

}
