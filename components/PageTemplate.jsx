import { Component, h } from 'preact'; // jshint ignore:line
import BreadcrumbBar from './BreadcrumbBar';
import Footer from './Footer';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';


/**
 * Template for a standard page on the site.
 */
export default class StandardPage extends Component {

  static get asyncProperties() {
    return SideNavigation.asyncProperties;
  }

  render(props) {
    return (
      <div class="pageWrapper">
        <SideNavigation navigation={props.navigation}/>
        <div class="main">
          <TopNavigation/>
          <div class="breadcrumbBar">
            <div class="gutter"></div>
            <BreadcrumbBar ancestors={props.ancestors}/>
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
              <Footer title={props.title} url={props.url}>{props.footer}</Footer>
            </article>
            <div class="gutter"></div>
          </div>
        </div>
      </div>
    );
  }

}
