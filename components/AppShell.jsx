import { Component, h } from 'preact'; // jshint ignore:line

export default class AppShell extends Component {

  render(props) {

    const titleBar =
        props.titleBar ||
        (props.title && `${props.title} - Presterity`) ||
        '';

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
        </head>
        <body>
          <div id="root">
            {props.children}
          </div>
        </body>
      </html>
    );
  }

}
