import { Component, h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';


export default class Hello extends Component {

  static get asyncProperties() {
    return PageTemplate.asyncProperties;
  }

  render(props, state) {
    return (
      <PageTemplate title={props.title} navigation={props.navigation}>
        <p>{props.message}</p>
      </PageTemplate>
    );
  }

}