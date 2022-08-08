import { Navigate, useRoutes } from 'react-router-dom';

import DefaultLayout from './layouts/default';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import NotFound from './pages/Page404';

function PublicRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);

  return routes;
}

export default PublicRoutes;