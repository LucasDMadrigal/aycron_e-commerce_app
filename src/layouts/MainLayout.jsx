import React, { useEffect, useState } from "react";
import "./styles/MainLayout.css";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
const MainLayout = ({ children }) => {
  const [storedUser, setStoredUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(
      `🚀 ~ useEffect ~ (localStorage.getItem("user")):`,
      JSON.parse(localStorage.getItem("user"))
    );
    // dispatch(login(user));
  }, []);

  const HandleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav>
          <ul>
            {loggedIn ? (
              <>
                <li>{/* <Link to="/auth/account">Account</Link> */}</li>
                <li>
                  <span style={{ cursor: "pointer" }} onClick={HandleLogout}>
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
