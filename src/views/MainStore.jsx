import React, { use, useEffect, useState } from "react";
import "./styles/MainStore.css";
import axios from "axios";
import { useSelector } from "react-redux";

const apiUrl = import.meta.env.VITE_API_URL;

const MainStore = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios
      .get(`${apiUrl}products/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.payload);
      });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>
      <section className="mainStore--container">
        <h1>MainStore</h1>
      </section>
    </>
  );
};

export default MainStore;
