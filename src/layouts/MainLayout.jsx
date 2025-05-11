import React, { Children } from "react";
import "./styles/MainLayout.css";
const MainLayout = ({ children }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Content</h1>
        {children}
      </main>
    </>
  );
};

export default MainLayout;
