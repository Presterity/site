import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


/**
 * "Not Found" page.
 */
export default class NotFoundPage extends PageTemplate {

  render(props) {
    return (
      <PageTemplate
          navigation={props.navigation}
          title={this.title}
          disableTitle={true}
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
    return this.props.title;
  }

}
