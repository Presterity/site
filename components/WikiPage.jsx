import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';
const wiki = require('../server/connectors/wiki');


/**
 * A page that renders content from the Atlassian wiki.
 */
export default class WikiPage extends PageTemplate {

  get asyncProperties() {
    const pagePromise = wiki.wikiPageWithTitle(this.title)
    .then(wikiPage => {
      return {
        ancestors: wikiPage.ancestors,
        body: wikiPage.body
      };
    });
    return Promise.all([super.asyncProperties, pagePromise])
    .then(results => {
      return Object.assign.apply({}, results);
    });
  }

  render(props) {
    const footer = (
      <div>
        <p>
          You can <a href="/Submissions">submit news</a> on this topic.
          If something's wrong on this
          page, <a href="/Volunteering">help us fix it</a>.
        </p>
        <p>
          This work is licensed under
          a <a rel="license" href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        </p>
      </div>
    );

    return (
      <PageTemplate
          navigation={props.navigation}
          title={this.title}
          url={props.url}
          footer={footer}
        >
        <div dangerouslySetInnerHTML={{ __html: props.body }} />
      </PageTemplate>
    );
  }

  get title() {
    const requestTitle = this.props.request.params.title;
    const title = wiki.unescapePageTitle(requestTitle);
    return title;
  }

}
