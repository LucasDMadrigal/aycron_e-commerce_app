import React, { use, useEffect, useState } from "react";
import "./styles/MainStore.css";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";

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
        <div className="mainStore--products">
          {products.map((product) => (
            // <div className="mainStore--product">
            //   <h2>{product.name}</h2>
            //   <p>{product.price}</p>
            // </div>
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainStore;
