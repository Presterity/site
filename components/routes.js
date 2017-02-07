import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import LabelPage from './LabelPage';
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
  '/reference/label/:label': LabelPage,
  '/:title': WikiPage,
  '/:area/:title': WikiPage,
  '/': HomePage
};
