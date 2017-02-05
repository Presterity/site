import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * "Not Found" page.
 */
export default class NotFoundPage extends PageTemplate {

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
          We don&rsquo;t have a page for &ldquo;{this.title}&rdquo; yet!
        </p>
        <p>
          Would you consider <a href="/Volunteering">volunteering</a> and
          helping us make one?
        </p>
      </PageTemplate>
    );
  }

  get title() {
    // TODO: Pass in title when constructing page.
    // return this.props.title;
    return "Not Found";
  }

}
