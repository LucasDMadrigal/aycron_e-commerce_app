import React from "react";
import "../styles/Forms.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
const LoginForm = () => {
  const [user, setUser] = React.useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);

    dispatch(login(user));
  };

  return (
    <>
      <h2>LOGIN</h2>
      <form className="form login-form" action="">
        <input value={user.email} onChange={handleChange} type="text" placeholder="email" />
        <input value={user.password} onChange={handleChange} type="password" placeholder="password" />
        <button onClick={handleSubmit} className="btn btn-primary" type="button">LOGIN</button>
      </form>
    </>
  );
};

export default LoginForm;
