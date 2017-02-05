import { Component, h } from 'preact'; // jshint ignore:line
import Bookmark from './Bookmark';


/**
 * A list (actually, a table) of bookmarks whose tags include a given title.
 */
export default class BookmarkList extends Component {

  render(props) {
    const bookmarks = props.bookmarks.map(bookmarkProps => (
      <Bookmark {...bookmarkProps} excludeTag={props.excludeTag}/>
    ));
    return (
      <table class="topicLinks">{bookmarks}</table>
    );
  }

}
