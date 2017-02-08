import { h } from 'preact'; // jshint ignore:line
import bookmarks from '../connectors/bookmarks';
import BookmarkList from './BookmarkList';
import PageTemplate from './PageTemplate';
import render from 'preact-render-to-string';
import wiki from '../connectors/wiki';


/**
 * The Home page.
 *
 * This is a variant of the usual wiki page that shows the latest links
 * instead of links based on their tags.
 */
export default class HomePage extends PageTemplate {

  get asyncProperties() {

    const title = this.title;

    // Load the wiki page with the given title.
    const pagePromise = wiki.wikiPageWithTitle(title)
    .then(wikiPage => {
      if (!wikiPage) {
        // If we can't find the Home page, it's an error.
        throw `Couldn't find the wiki content for a page titled "${title}".`;
      }
      return {
        ancestors: wikiPage.ancestors,
        body: wikiPage.body
      };
    });

    // Load the most recent bookmarks.
    const requestBookmarkCount = 5;
    const bookmarksPromise = bookmarks.mostRecentBookmarks(requestBookmarkCount)
    .then(bookmarks => {
      return { bookmarks };
    });

    // Merge the above with the base class' async properties.
    return Promise.all([super.asyncProperties, pagePromise, bookmarksPromise])
    .then(results => {
      return Object.assign.apply({}, results);
    });
  }

  render(props) {

    // Merge the bookmark list into the wiki page body to construct the final
    // page body.
    const bookmarkList = (
      <BookmarkList bookmarks={props.bookmarks} excludeTag={this.title}/>
    );
    const bookmarkListHtml = render(bookmarkList);
    const body = wiki.replacePlaceholderWithLinks(props.body, bookmarkListHtml);

    return (
      <PageTemplate
          ancestors={props.ancestors}
          navigation={props.navigation}
          title="Presterity"
          url={props.url}
        >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </PageTemplate>
    );
  }

  get title() {
    return 'Home';
  }

  get titleBar() {
    return 'Presterity';
  }

}
