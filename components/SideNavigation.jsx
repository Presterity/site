import { Component, h } from 'preact'; // jshint ignore:line
import wiki from '../connectors/wiki';


/**
 * Side navigation pane
 */
export default class SideNavigation extends Component {

  get asyncProperties() {
    return wiki.navigation()
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
