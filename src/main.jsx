// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import TimerPage from './pages/TimerPage.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/t/:id', element: <TimerPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);