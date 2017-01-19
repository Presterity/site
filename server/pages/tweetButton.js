const socialIcons = require('./socialIcons');
const twitterIcon = socialIcons.twitter({ fill: '#fff' });

/*
 * Return HTML for a link that sends the user to Twitter to compose a tweet.
 */
module.exports = (text, url) => `
  <a class="tweetButton" href="https://twitter.com/intent/tweet?via=presterity&text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}">
    ${twitterIcon}
    <span>Share</span>
  </a>
`;
