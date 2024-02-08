import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import New from './routes/new';
import ErrorPage from './error-page';
import DeleteSession from './routes/delete';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/new',
    element: <New />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/delete/workout_session/:itemId',
    element: <DeleteSession />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
