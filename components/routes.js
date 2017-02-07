import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import SearchPage from './SearchPage';
import WikiPage from './WikiPage';


/**
 * Map routes to components.
 */
export default {
  '/error': ErrorPage,
  '/notfound': NotFoundPage, // TODO: Remove
  '/search': SearchPage,
  '/:title': WikiPage,
  '/:area/:title': WikiPage,
  '/': HomePage
};
