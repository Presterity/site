import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import WikiPage from './WikiPage';


/**
 * Map routes to components.
 */
export default {
  '/error': ErrorPage,
  '/notfound': NotFoundPage, // TODO: Remove
  '/:title': WikiPage,
  '/:area/:title': WikiPage,
  '/': HomePage
};
