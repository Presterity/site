import { Component, h } from 'preact'; // jshint ignore:line
const navigationPane = require('../server/pages/navigationPane');


/**
 * Side navigation pane
 */
export default class SideNavigation extends Component {

  get asyncProperties() {
    return navigationPane()
    .then(html => {
      return {
        navigation: html
      };
    });
  }

  render(props) {
    return (
      <nav class="sideNavigation">
        <div id="logoBlock">
          <a id="linkHome" href="/">
            <img id="logo" src="/static/presterity.png" alt="Presterity logo: a torch and a book"/>
          </a>
        </div>
        <p id="tableOfContentsCaption">
          TABLE <em>of</em> CONTENTS
        </p>
        <div id="captionSeparatorContainer">
          <div id="captionSeparator"></div>
        </div>
        <div class="sideNavigation" dangerouslySetInnerHTML={{ __html: props.navigation }} />
      </nav>
    );
  }

}
