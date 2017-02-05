import ErrorPage from './ErrorPage';
import Hello from './Hello';
import NotFoundPage from './NotFoundPage';
import WikiPage from './WikiPage';


/**
 * Map routes to components.
 */
export default {
  '/error': ErrorPage,
  '/hello': Hello,
  '/notfound': NotFoundPage, // TODO: Remove
  '/About': WikiPage
};
