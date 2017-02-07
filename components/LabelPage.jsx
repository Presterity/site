import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';
import SearchResultsList from './SearchResultsList';
import wiki from '../server/connectors/wiki';


/**
 * A page showing all wiki pages tagged with a given label.
 */
export default class LabelPage extends PageTemplate {

  get asyncProperties() {

    const label = this.props.request.params.label;
    const searchPromise = wiki.pagesWithLabel(label)
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
    const label = props.request.params.label;
    const title = `Pages tagged with "${label}"`;
    return (
      <PageTemplate
          ancestors={props.ancestors}
          navigation={props.navigation}
          title={title}
          url={props.url}
        >
        <SearchResultsList results={props.results}/>
      </PageTemplate>
    );
  }

  get title() {
    return this.props.request.params.label;
  }

}
