import { h } from 'preact'; // jshint ignore:line
import bookmarks from '../server/connectors/bookmarks';
import BookmarkList from './BookmarkList';
import PageTemplate from './PageTemplate';
import render from 'preact-render-to-string';
import wiki from '../server/connectors/wiki';


/**
 * The Home page.
 *
 * This is a variant of the usual wiki page that shows the latest links
 * instead of links based on their tags.
 */
export default class HomePage extends PageTemplate {

  render(props) {
    const body = "This is the Home page.";

    return (
      <PageTemplate
          ancestors={props.ancestors}
          navigation={props.navigation}
          title={this.title}
          url={props.url}
        >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </PageTemplate>
    );
  }

  get title() {
    return "Presterity";
  }

  get titleBar() {
    return this.title;
  }

}
