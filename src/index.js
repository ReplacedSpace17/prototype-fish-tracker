

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';


import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import ErrorPage from "./error-page";
import Login from './login';
import Dashboard from './dashboard';

//taller

import SimulatorSpecies from './Simulator';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="Login"/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/Home",
    element: <SimulatorSpecies/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/data",
    element: <Dashboard/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
