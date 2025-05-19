import { useEffect, useState } from "react";
import Login from "./views/Login";
import "./App.css";
import { BrowserRouter, Routes, useNavigate } from "react-router";
import RoutesNoAuth from "./HOCs/RoutesNoAuth";
import Landing from "./views/Landing";
import Register from "./views/Register";
import MainLayout from "./layouts/MainLayout";
import AdminPanel from "./views/AdminPanel";
import RoutesAdminAuth from "./HOCs/RoutesAdminAuth";
import MainStore from "./views/MainStore";
import Icon from '@mui/material/Icon';

const routesNoAuth = [
  {
    path: "/Login",
    element: <Login />,
    key: "login",
  },
  {
    path: '/Register',
    element: <Register />,
    key: 'register',
  },
  {
    path: "/",
    element: <Landing />,
    key: "home",
  },
  {
    path: '/auth/account',
    element: <MainStore />,
    key: 'adminPanel',
  }
];

const routesAdmin = [
  {
    path: '/auth/admin',
    element: <AdminPanel />,
    key: 'adminPanel',
  },
];


function App() {

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes path='/'>
          {routesNoAuth.map((route) => RoutesNoAuth(route))}
          {routesAdmin.map((route) => RoutesAdminAuth(route))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
