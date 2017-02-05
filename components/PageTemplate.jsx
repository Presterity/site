import { Component, h } from 'preact'; // jshint ignore:line

/**
 * Template for a standard page on the site.
 */
export default class StandardPage extends Component {

  render(props, state) {
    return (
      <div class="pageWrapper">
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
          navigation...
        </nav>
        <div class="main">
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
          <div class="breadcrumbBar">
            <div class="gutter"></div>
            <div class="breadcrumbs">breadcrumbs...</div>
            <div class="gutter"></div>
          </div>
          <div class="articleContainer">
            <div class="gutter"></div>
            <article class="wikiContent">
              <img id="mobileHomeLogo" src="/static/appIcon.png" alt="Presterity logo: a torch and a book"/>
              <h1 class="pageTitle">{props.title}</h1>
              <div>
                {props.children}
              </div>
              <footer>
                <p>tweetHtml...</p>
                footer...
                <p id="daysRemainingMessage">
                  daysRemainingMessage...
                </p>
              </footer>
            </article>
            <div class="gutter"></div>
          </div>
        </div>
      </div>
    );
  }

}
