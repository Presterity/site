import { h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default (props) => (
  <header id="topNavigation">
    <div class="gutter"></div>
    <div id="topLinks">
      <a id="linkAbout" href="/About">ABOUT</a>
      <a id="linkVolunteering" href="/Volunteering">VOLUNTEER</a>
      <a id="linkSearch" href="/search">SEARCH</a>
      <a id="linkSubmissions" href="/Submissions">SUBMIT NEWS</a>
    </div>
    <div class="gutter"></div>
  </header>
);
