import { h } from 'preact'; // jshint ignore:line
import bookmarks from '../server/connectors/bookmarks';
import BookmarkList from './BookmarkList';
import NotFoundPage from './NotFoundPage';
import PageTemplate from './PageTemplate';
import render from 'preact-render-to-string';
import wiki from '../server/connectors/wiki';


/**
 * A page that renders content from the Atlassian wiki.
 */
export default class WikiPage extends PageTemplate {

  get asyncProperties() {

    const title = this.title;

    // Load the wiki page with the given title.
    const pagePromise = wiki.wikiPageWithTitle(title)
    .then(wikiPage => {
      if (wikiPage) {
        return {
          ancestors: wikiPage.ancestors,
          body: wikiPage.body
        };
      }
    });

    // Load the bookmarks tagged with the same title.
    const bookmarksPromise = bookmarks.bookmarksForTopic(title)
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

    if (!props.body) {
      // Page wasn't found on wiki; return "Not Found" page instead.
      return (
        <NotFoundPage
          navigation={props.navigation}
          title={this.title}
          url={props.url}>
        </NotFoundPage>
      );
    }

    // Merge the bookmark list into the wiki page body to construct the final
    // page body.
    const bookmarkList = (
      <BookmarkList bookmarks={props.bookmarks} excludeTag={this.title}/>
    );
    const bookmarkListHtml = render(bookmarkList);
    const body = wiki.replacePlaceholderWithLinks(props.body, bookmarkListHtml);

    const footer = (
      <div>
        <p>
          You can <a href="/Submissions">submit news</a> on this topic.
          If something's wrong on this
          page, <a href="/Volunteering">help us fix it</a>.
        </p>
        <p>
          This work is licensed under
          a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        </p>
      </div>
    );

    return (
      <PageTemplate
          ancestors={props.ancestors}
          navigation={props.navigation}
          title={this.title}
          url={props.url}
          footer={footer}
        >
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </PageTemplate>
    );
  }

  get title() {
    const requestTitle = this.props.request.params.title;
    const title = wiki.unescapePageTitle(requestTitle);
    return title;
  }

}
