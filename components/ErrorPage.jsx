import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * Error page.
 */
export default class ErrorPage extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          ancestors={props.ancestors}
          footer={props.footer}
          navigation={props.navigation}
          title="Oops"
          url={props.url}
        >
        <p>
          Sorry, something went wrong. 😞
        </p>
      </PageTemplate>
    );
  }

}
