import { h } from 'preact'; // jshint ignore:line


/**
 * Top navigation links
 */
export default (props) => (
  <header id="topNavigation">
    <div class="gutter"></div>
    <div id="topLinks">
      <a id="linkAbout" href="/About">ABOUT</a>&nbsp;
      <a id="linkVolunteering" href="/Volunteering">VOLUNTEER</a>&nbsp;
      <a id="linkSearch" href="/search">SEARCH</a>&nbsp;
      <a id="linkSubmissions" href="/Submissions">SUBMIT NEWS</a>
    </div>
    <div class="gutter"></div>
  </header>
);
