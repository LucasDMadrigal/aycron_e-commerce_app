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
];

const routesAdmin = [
  {
    path: '/auth/admin',
    element: <AdminPanel />,
    key: 'adminPanel',
  },
];


function App() {

  // const navigate = useNavigate();
  // useEffect(() => {
  //       // Si hay datos en localStorage, despachar la acción para iniciar sesión automáticamente
  //       const storedUser = JSON.parse(localStorage.getItem("user"));
  //       if (!storedUser || !storedUser.loggedIn) {
  //         navigate("/Login");
  //       }
  //     }, [navigate]);

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
