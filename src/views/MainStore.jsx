import React, { useEffect, useState } from "react";
import "./styles/MainStore.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { setCartFromLocalStorage } from "../redux/actions/cartActions";

const apiUrl = import.meta.env.VITE_API_URL;

const MainStore = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCartFromLocalStorage());

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

  return (
    <>
      <section className="mainStore--container">
        <h1>MainStore</h1>
        <div className="mainStore--products">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainStore;
