import { Navigate, useRoutes } from 'react-router-dom';

import DefaultLayout from './layouts/default';
import Home from './pages/private/Home';
import NotFound from './pages/Page404';

function PrivateRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);

  return routes;
}

export default PrivateRoutes;