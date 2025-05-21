import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { setCartFromLocalStorage } from "../redux/actions/cartActions";
import "./styles/MainStore.css";

const apiUrl = import.meta.env.VITE_API_URL;

const MainStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cart) || [];

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

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const HandleSearch = ({ target }) => {
    const search = target.value;

    if (search === "") {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const toogleSelected = (productId) => {
    return cart.some((item) => item._id === productId);
  };
  return (
    <>
      <section className="mainStore--container">
        <h1>MainStore</h1>
        <input
          type="text"
          onChange={HandleSearch}
          placeholder="busca por nombre"
        />
        <div className="mainStore--products">
          {filteredProducts.map((product) => (
            <ProductCard
              selected={toogleSelected(product._id)}
              product={product}
              key={product._id}
            />
            // <></>
          ))}
        </div>
      </section>
    </>
  );
};

export default MainStore;
