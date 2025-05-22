import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import "./styles/MainLayout.css";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const cart = useSelector((state) => state.cart);

  const HandleLogout = () => {
    if (cart.length > 0) {
      if (
        window.confirm(
          `Tienes ${cart.length} productos en tu carrito. ¿Deseas vaciarlo?`
        )
      ) {
        dispatch(logout());
        window.location.replace("/Login");
      }
    }
    else {
      dispatch(logout());
      window.location.replace("/Login");
    }
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {loggedIn ? (
              <>
                <li>
                  <Link to="/auth/store">Store</Link>
                </li>
                <li>
                  <Link to="/auth/cart">cart</Link>
                  <span className="cart--quantity">{cart.length}</span>
                </li>
                <li>
                  <span className="logout" style={{ cursor: "pointer" }} onClick={HandleLogout}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
