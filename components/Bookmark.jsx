import { Component, h } from 'preact'; // jshint ignore:line
import wiki from '../connectors/wiki';


/**
 * Return a bookmark from the server as HTML for presentation to the user.
 * This will be a row intended for display in a table.
 *
 * The result will include "See also" links to topics tagged on the bookmark. If
 * an "excludeTag" property has been supplied, a "See also" link will *not* be
 * included for the indicated topic (since the user will already be looking at
 * that page).
 */
export default class Bookmark extends Component {

  render(props) {

    let domain = props.domain;
    if (domain.startsWith('www.')) {
      domain = domain.slice(4); // Remove "www."
    }

    // Our bookmark format has writers put the date of an event in the bookmark
    // title. Parse that out.
    const { date, text } = parseLinkTitle(props.title);

    // Construct list of bookmark tags. If a current title has been supplied,
    // *don't* include that tag. Otherwise, include all tags.
    const tags = props.tags
      .filter(tag => tag !== props.excludeTag)
      .map((tag, index) => {
        const url = `/reference/${wiki.escapePageTitle(tag)}`;
        const comma = index > 0 ? ', ' : '';
        return (
          <span>
            {comma}
            <a href={url}>{tag}</a>
          </span>
        );
      });

    let seeAlsoSection = null;
    if (tags.length > 0) {
      const seeLabel = props.excludeTag ? 'See also' : 'See';
      seeAlsoSection = (
        <span>({seeLabel} {tags})</span>
      );
    }

    // The bookmark may have an optional description ("excerpt").
    const excerpt = props.excerpt ?
      (
        <div>
          <div class="excerpt">{props.excerpt}</div>
        </div>
      ) :
      null;

    // Note: Spans with spaces exist to preserve significant whitespace in JSX.
    return (
      <tr>
        <td>{date}</td>
        <td>
          {text}
          <span> </span>
          <a href={props.link}>{domain}</a>
          <span> </span>
          {seeAlsoSection}
          {excerpt}
        </td>
      </tr>
    );
  }

}


function parseLinkTitle(title) {
  // Find link parts:
  // * optional whitespace to start
  // * date in 2017.01.17 format, can also use hyphens
  // * whitespace
  // * remaining text
  const linkPartsRegex = /^\s*([\d\.-]+)\s+(.*)/;
  const match = linkPartsRegex.exec(title);
  let date;
  let text;
  if (match) {
    date = match[1];
    text = match[2];
  } else {
    date = '';
    text = title;
  }
  return { date, text };
}
