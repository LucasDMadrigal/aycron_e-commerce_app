import React, { useEffect } from "react";
import "../styles/Forms.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router";
import axios from "axios";
import { parseJwt } from "../../utils/parseJwt";

const apiUrl = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const [user, setUser] = React.useState({});

  console.log("🚀 ~ apiUrl:", apiUrl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Si hay datos en localStorage, despachar la acción para iniciar sesión automáticamente
  //   const storedUser = JSON.parse(localStorage.getItem("auth"));
  //   if (storedUser && storedUser.token) {
  //     dispatch(login(storedUser));
  //     navigate(storedUser.isAdmin ? "/auth/admin" : "/auth/account");
  //   }
  // }, [dispatch, navigate]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);

    try {
      axios.post(`${apiUrl}user/login`, user)
      .then((response) => {
        const token = response.data;
        console.log("🚀 ~ handleLogin ~ token:", token)
        const loggedUser = parseJwt(token);
        loggedUser.token = token;
        console.log("🚀 ~ .then ~ loggedUser:", loggedUser)
        dispatch(login(loggedUser));
        // navigate(loggedUser.isAdmin ? "/auth/admin" : "/auth/account");
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>LOGIN</h2>
      <form className="form login-form" action="">
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          type="text"
          placeholder="email"
        />
        <input
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        <button onClick={handleLogin} className="btn btn-primary" type="button">
          LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginForm;
