import { Component, h } from 'preact'; // jshint ignore:line
const wiki = require('../server/connectors/wiki');


/*
 * Given Atlassian Confluence search results, return them as a bulleted list of
 * clickable links.
 */
export default class SearchResultsList extends Component {

  render(props) {
    const links = props.results && props.results.map(result => {
      const title = result.title;
      const escaped = wiki.escapePageTitle(title);
      const href = `/reference/${escaped}`;
      return (
        <li><a href={href}>{title}</a></li>
      );
    });
    return (
      <ul>{links}</ul>
    );
  }

}
