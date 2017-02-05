import { Component, h } from 'preact'; // jshint ignore:line
import DaysRemaining from './DaysRemaining';

/**
 * Standard template footer
 */
export default class Footer extends Component {

  render(props, state) {
    return (
      <footer>
        <p>tweetHtml...</p>
        {props.children}
        <DaysRemaining/>
      </footer>
    );
  }

}
