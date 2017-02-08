import { Component, h } from 'preact'; // jshint ignore:line
import BreadcrumbBar from './BreadcrumbBar';
import Footer from './Footer';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';


/**
 * Template for a standard page on the site.
 */
export default class StandardPage extends Component {

  get asyncProperties() {
    return SideNavigation.prototype.asyncProperties; // Same for all instances.
  }

  render(props) {
    const area = getArea(props);
    const ancestors = getAncestors(props);
    const titleClass = props.disableTitle ?
      'pageTitle disabled' : // For special appearance on "Not Found" page.
      'pageTitle';

    return (
      <div class="pageWrapper" area={area} page={props.title}>
        <SideNavigation navigation={props.navigation}/>
        <div class="main">
          <TopNavigation/>
          <div class="breadcrumbBar">
            <div class="gutter"></div>
            <BreadcrumbBar ancestors={ancestors}/>
            <div class="gutter"></div>
          </div>
          <div class="articleContainer">
            <div class="gutter"></div>
            <article class="wikiContent">
              <img id="mobileHomeLogo" src="/static/appIcon.png" alt="Presterity logo: a torch and a book"/>
              <h1 class={titleClass}>{props.title}</h1>
              <div>
                {props.children}
              </div>
              <Footer title={props.title} url={props.url}>{props.footer}</Footer>
            </article>
            <div class="gutter"></div>
          </div>
        </div>
      </div>
    );
  }

}


function getAncestors(props) {
  const ancestors = props.ancestors;
  if (ancestors && ancestors.length > 0) {
    // Page with regular ancestors
    return ancestors;
  } else if (props.title === 'Presterity') {
    // Home page has no ancestors;
    return [];
  } else {
    // Other top-level page are made to appear under Home.
    // This ensures mobile users have a breadcrumb to take them back to Home.
    return [{ title: 'Home' }];
  }
}

// Return the site area in which this page is shown under.
function getArea(props) {
  const ancestors = props.ancestors;
  if (!ancestors || ancestors.length === 0) {
    return props.title === 'Presterity' ?
      // Home page is in the "Home" area.
      'Home' :
      // Other top-level pages (Search, etc.) are their own areas.
      props.title;
  } else if (ancestors[0].title === 'Home') {
    // Pages beneath Home area in the "Reference" area.
    return 'Reference';
  } else if (ancestors.length > 0) {
    // Other pages fall under their top ancestor.
    return ancestors[0].title;
  } else {
    // Unknown.
    return '';
  }
}
