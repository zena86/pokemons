import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import ErrorFallback from './components/errorFallback/ErrorFallback';
import NotFound from './pages/notFound/';
import Detail from './components/detail/Detail';

export const routerConfig = [
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorFallback text="Something went wrong" />,
    children: [
      {
        path: '',
        element: <Detail />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routerConfig);
