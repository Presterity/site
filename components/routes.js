import ErrorPage from './ErrorPage';
import Hello from './Hello';
import NotFoundPage from './NotFoundPage';


/**
 * Map routes to components.
 */
export default {
  '/error': ErrorPage,
  '/hello': Hello,
  '/notfound': NotFoundPage // TODO: Remove
};
