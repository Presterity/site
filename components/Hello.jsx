import { h } from 'preact'; // jshint ignore:line
import PageTemplate from './PageTemplate';

export default (props) => (
  <PageTemplate title={props.title}>
    <p>{props.message}</p>
  </PageTemplate>
);
