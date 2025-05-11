import React from "react";
import "../styles/Forms.css";

const RegisterForm = () => {
  const [user, setUser] = React.useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <>
      <h2>REGISTER</h2>
      <form className="form login-form" action="">
        <input value={user.name} onChange={handleChange} type="text" placeholder="name" />
        <input value={user.lastName} onChange={handleChange} type="text" placeholder="last name" />
        <input value={user.email} onChange={handleChange} type="text" placeholder="email" />
        <input value={user.password} onChange={handleChange} type="text" placeholder="password" />
        <button onClick={handleSubmit} className="btn btn-primary" type="button">LOGIN</button>
      </form>
    </>
  );
};

export default RegisterForm;
