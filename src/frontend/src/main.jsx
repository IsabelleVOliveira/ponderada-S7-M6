import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TeleopScreen from './pages/teleopScreen.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    path: '/teleopScreen',
    element: <TeleopScreen/>
  }
]);

// Renderização do aplicativo com o provedor de roteador
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
