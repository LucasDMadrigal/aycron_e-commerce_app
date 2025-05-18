import React from "react";
import "../styles/Forms.css";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
  const [newUser, setNewUser] = React.useState({});

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      axios.post(`${apiUrl}user/register`, newUser).then((response) => {
        alert(response.data);
        window.location.href = "/login";      
      })
    .catch((error) => {
      alert(error.response.data);
    });
    } catch (error) {
      alert(error.data);
    }
  };

  return (
    <>
      <h2>REGISTER</h2>
      <form className="form login-form" onSubmit={handleSubmit}>
        <input
          required
          value={newUser.name}
          name="first_name"
          onChange={handleChange}
          type="text"
          placeholder="name"
        />
        <input
          required
          value={newUser.lastName}
          name="last_name"
          onChange={handleChange}
          type="text"
          placeholder="last name"
        />
        <input
          required
          value={newUser.email}
          name="email"
          onChange={handleChange}
          type="text"
          placeholder="email"
        />
        <input
          required
          value={newUser.password}
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="password"
        />
        <button className="btn btn-primary" type="submit">
          REGISTER
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
