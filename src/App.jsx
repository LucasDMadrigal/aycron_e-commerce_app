import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Login from "./assets/views/Login";
import "./App.css";
import { BrowserRouter, Routes } from "react-router";
import RoutesNoAuth from "./HOCs/RoutesNoAuth";
import Landing from "./assets/views/Landing";
import MainLayout from "./layouts/MainLayout";

const routesNoAuth = [
  {
    path: "/Login",
    element: <Login />,
    key: "login",
  },
  // {
  //   path: '/Register',
  //   element: <Register />,
  //   key: 'register',
  // },
  {
    path: "/",
    element: <Landing />,
    key: "home",
  },
];

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>{routesNoAuth.map((route) => RoutesNoAuth(route))}</Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
