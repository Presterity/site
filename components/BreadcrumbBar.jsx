import { Component, h } from 'preact'; // jshint ignore:line
const wiki = require('../connectors/wiki');


/**
 * Breadcrumb bar
 */
export default class BreadcrumbBar extends Component {

  render(props) {
    
    const ancestors = props.ancestors || [];
    const breadcrumbs = ancestors.map((ancestor, index) => {
      const title = ancestor.title;
      const siteUrl = wiki.pageTitleToSiteUrl(title);
      const separator = index > 0 ? ' / ' : '';
      return (
        <span>
          {separator}
          <a href={siteUrl}>{title}</a>
        </span>
      );
    });

    return (
      <div class="breadcrumbs">{breadcrumbs}</div>
    );
  }

}
