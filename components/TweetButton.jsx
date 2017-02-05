import { Component, h } from 'preact'; // jshint ignore:line
import TwitterIcon from './TwitterIcon';


export default class TweetButton extends Component {

  render(props) {
    const encodedText = encodeURIComponent(props.text);
    const encodedUrl = encodeURIComponent(props.url);
    const href = `https://twitter.com/intent/tweet?via=presterity&text=${encodedText}&url=${encodedUrl}`;
    return (
      <a class="tweetButton" href={href}>
        <TwitterIcon fill="#fff"/>
        <span>Share</span>
      </a>
    );
  }

}
