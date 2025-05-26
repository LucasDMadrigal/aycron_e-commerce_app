import Login from "./views/Login";
import "./App.css";
import { BrowserRouter, Routes } from "react-router";
import RoutesNoAuth from "./HOCs/RoutesNoAuth";
import Landing from "./views/Landing";
import Register from "./views/Register";
import MainLayout from "./layouts/MainLayout";
import AdminPanel from "./views/AdminPanel";
import RoutesAdminAuth from "./HOCs/RoutesAdminAuth";
import MainStore from "./views/MainStore";
import Cart from "./views/Cart";
import Purchases from "./views/Purchases";
import RoutesAuth from "./HOCs/RoutesAuth";

const routesNoAuth = [
  {
    path: "/Login",
    element: <Login />,
    key: "login",
  },
  {
    path: "/Register",
    element: <Register />,
    key: "register",
  },
  {
    path: "/",
    element: <Landing />,
    key: "home",
  },
];

const routesAuth = [
  {
    path: "/auth/store",
    element: <MainStore />,
    key: "adminPanel",
  },
  {
    path: "/auth/cart",
    element: <Cart />,
    key: 'cart',
  },
  {
    path: '/auth/purchases',
    element: <Purchases />,
    key: 'purchases',
  }
]

const routesAdmin = [
  {
    path: "/auth/admin",
    element: <AdminPanel />,
    key: "adminPanel",
  },
];

function App() {
  return (
    <MainLayout>
      <Routes>
        {routesNoAuth.map((route) => RoutesNoAuth(route))}
        {routesAdmin.map((route) => RoutesAdminAuth(route))}
        {routesAuth.map((route) => RoutesAuth(route))}
      </Routes>
    </MainLayout>
  );
}

export default App;
