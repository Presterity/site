import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * Test page
 */
export default class Hello extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          ancestors={props.ancestors}
          footer={props.footer}
          navigation={props.navigation}
          title={props.title}
          url={props.url}
        >
        <p>{props.message}</p>
      </PageTemplate>
    );
  }

}
