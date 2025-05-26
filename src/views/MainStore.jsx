import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import "./styles/MainStore.css";

const apiUrl = import.meta.env.VITE_API_URL;

const MainStore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const searchInputRef = useRef(null);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cart) || [];

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
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let filtered = [...products];

    if (searchInput !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  }, [searchInput, minPrice, maxPrice, products]);

  const toogleSelected = (productId) => {
    return cart.some((item) => item.product === productId);
  };

  const HandleSearch = (e) => setSearchInput(e.target.value);
  const HandleMinPrice = (e) => setMinPrice(e.target.value);
  const HandleMaxPrice = (e) => setMaxPrice(e.target.value);

  const HandleCleanFilter = () => {
    searchInputRef.current.value = "";
    minPriceRef.current.value = "";
    maxPriceRef.current.value = "";
    setFilteredProducts(products);
  };

  return (
    <>
      <section className="mainStore--container">
        <h1>AycronStore</h1>
        <input
          name="search"
          ref={searchInputRef}
          type="text"
          onChange={HandleSearch}
          placeholder="busca por nombre"
        />
        <div className="filter-price--container">
          <div className="filter-price-input--container">
            <label htmlFor="min-price">Precio desde:</label>
            <input
              name="min-price"
              ref={minPriceRef}
              type="number"
              min="0"
              onChange={HandleMinPrice}
              placeholder="0..."
            />
          </div>
          <div className="filter-price-input--container">
            <label htmlFor="min-price">Precio hasta:</label>
            <input
              name="max-price"
              ref={maxPriceRef}
              type="number"
              min="0"
              onChange={HandleMaxPrice}
              placeholder="9999..."
            />
          </div>
          <div className="clean-filter--container">
            <button onClick={HandleCleanFilter}>Limpiar filtros</button>
          </div>
        </div>
        <div className="mainStore--products">
          {filteredProducts.map((product) => (
            <ProductCard
              selected={toogleSelected(product._id)}
              product={product}
              key={product._id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default MainStore;
