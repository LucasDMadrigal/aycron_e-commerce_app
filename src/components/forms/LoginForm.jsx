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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Holis");

    // Si hay datos en localStorage, despachar la acción para iniciar sesión automáticamente
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ useEffect ~ storedUser:", storedUser);
    if (storedUser && storedUser.loggedIn) {
      dispatch(login(storedUser));
      navigate(storedUser.isAdmin ? "/auth/admin" : "/auth/account");
    }
  }, []);

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
      axios.post(`${apiUrl}user/login`, user).then((response) => {
        const token = response.data;
        const loggedUser = parseJwt(token);
        const auth = {
          user: {
          first_name: loggedUser.first_name,
          last_name: loggedUser.last_name,
          userId: loggedUser.userId,
          isAdmin: loggedUser.isAdmin,
          iat: loggedUser.iat,
          exp: loggedUser.exp,
        },
        token: token,
        expiresIn: loggedUser.exp,
        };
        dispatch(login(auth));
        navigate(loggedUser.isAdmin ? "/auth/admin" : "/auth/account");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>LOGIN</h2>
      <form className="form login-form" onSubmit={handleLogin}>
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
        <button className="btn btn-primary" type="submit">
          LOGIN
        </button>
      </form>
    </>
  );
};

export default LoginForm;
