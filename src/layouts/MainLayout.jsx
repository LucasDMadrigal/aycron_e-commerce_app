import React, { useEffect, useState } from "react";
import "./styles/MainLayout.css";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
const MainLayout = ({ children }) => {
  const [storedUser, setStoredUser] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(`🚀 ~ useEffect ~ (localStorage.getItem("user")):`, JSON.parse(localStorage.getItem("user")))
    setStoredUser(user);
  }, []);

  const HandleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav>
        <ul>
          {storedUser?.loggedIn ? (
            <>
              <li>
                {/* <Link to="/auth/account">Account</Link> */}
              </li>
              <li>
                <Link to="#" onClick={HandleLogout}>Logout</Link>
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
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
