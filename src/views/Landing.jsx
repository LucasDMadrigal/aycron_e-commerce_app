import React, { useEffect } from 'react'
import reactLogo from "../assets/react.svg";
import viteLogo from "../../public/vite.svg";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../redux/actions/authActions';

const Landing = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

   useEffect(() => {
      // Si hay datos en localStorage, despachar la acción para iniciar sesión automáticamente
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.loggedIn) {
        dispatch(login(storedUser));
        navigate(storedUser.isAdmin ? "/auth/admin" : "/auth/account");
      }else{
        navigate("/Login");
      }
    }, [dispatch, navigate]);

  return (
    <div>
        <img src={reactLogo } alt="" />
        <img src={viteLogo } alt="" />
    </div>
  )
}

export default Landing