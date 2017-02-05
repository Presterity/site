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
          title={this.title}
          url={props.url}
        >
        <p>
          Hello, world.
        </p>
      </PageTemplate>
    );
  }

  get title() {
    return "Hello";
  }

}
