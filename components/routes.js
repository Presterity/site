import ErrorPage from './ErrorPage';
import HomePage from './HomePage';
import LabelPage from './LabelPage';
import SearchPage from './SearchPage';
import WikiPage from './WikiPage';


/**
 * Map routes to components.
 */
export default {
  '/error': ErrorPage,
  '/search': SearchPage,
  '/reference/label/:label': LabelPage,
  '/:title': WikiPage,
  '/:area/:title': WikiPage,
  '/': HomePage
};
