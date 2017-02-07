import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';
import SearchResultsList from './SearchResultsList';
import wiki from '../server/connectors/wiki';


/**
 * The Search page, withour search results (new search) or with results.
 */
export default class SearchPage extends PageTemplate {

  get asyncProperties() {

    const searchText = this.props.request.query.q;

    const isNewSearch = typeof searchText === 'undefined';
    const searchPromise = isNewSearch ?
      Promise.resolve() : // Don't need to search
      wiki.search(searchText)
        .then(searchResults => {
          return {
            results: searchResults
          };
        });

    return Promise.all([super.asyncProperties, searchPromise])
    .then(results => {
      return Object.assign.apply({}, results);
    });
  }

  render(props) {

    const searchText = props.request.query.q;
    const searchHeader = !props.results ?
      null :
      props.results.length > 0 ?
        `Pages containing "${searchText}"` :
        `No pages found`;

    return (
      <PageTemplate
          ancestors={props.ancestors}
          navigation={props.navigation}
          title={this.title}
          url={props.url}
        >
        <form>
          Search for:&nbsp;
          <input name="q" type="text" value={searchText} style="max-width: 50%;"/>&nbsp;
          <input type="submit" value="Search"/>
        </form>
        <h3>{searchHeader}</h3>
        <SearchResultsList results={props.results}/>
      </PageTemplate>
    );
  }

  get title() {
    return "Search";
  }

}
