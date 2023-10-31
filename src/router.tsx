import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import ErrorFallback from './components/errorFallback/ErrorFallback';
import NotFound from './pages/notFound/';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorFallback text="Something went wrong" />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
