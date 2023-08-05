import PageTemplate from './layouts/page-template/PageTemplate';
import Register from './pages/register-page/Register';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/login-page/Login';
import Guests from './pages/guests-page/Guests';
import RegisterUser from './pages/register-user/RegisterUser';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/guests',
        element: <Guests />,
      },
      {
        path: '/register-user',
        element: <RegisterUser />,
      },
      {
        path: '/guests/:id',
        element: <Guests />,
      },
    ],
  },
]);
