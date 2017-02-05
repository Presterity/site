import { Component, h } from 'preact'; // jshint ignore:line

export default class AppShell extends Component {

  render(props, state) {

    const titleBar = props.titleBar ||
        props.title ?
          `${props.title} - Presterity` :
          '';

    return (
      <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
          <title>{titleBar}</title>
          <link rel="stylesheet" href="/static/main.css"/>
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
