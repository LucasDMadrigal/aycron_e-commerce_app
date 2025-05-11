import React, { Children } from "react";
import "./styles/MainLayout.css";
import { Link } from "react-router";
const MainLayout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
