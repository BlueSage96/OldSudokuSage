import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './css/index.css';
import App from './App.jsx';
import Game from './Components/Game/Game';
import Menu from './Components/Menu/Menu';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Menu />} />
      <Route path="/game" element={<Game />} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}>
      <App />
    </RouterProvider>
  </StrictMode>
);
