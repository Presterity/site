import { Component, h } from 'preact'; // jshint ignore:line
import DaysRemaining from './DaysRemaining';
import TweetButton from './TweetButton';

/**
 * Standard template footer
 */
export default class Footer extends Component {

  render(props) {
    return (
      <footer>
        <TweetButton/>
        {props.children}
        <DaysRemaining/>
      </footer>
    );
  }

}
