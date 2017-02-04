/** @jsx h */

import { Component, h } from 'preact'; // jshint ignore:line

export default class AppShell extends Component {

  render(props, state) {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
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
