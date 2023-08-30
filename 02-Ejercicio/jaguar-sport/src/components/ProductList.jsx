import React, { useState } from "react";
import { data } from "../data";

export const ProductList = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
{/* Filter by category */}
  const [selectedCategory, setSelectedCategory] = useState("all");

  const uniqueCategories = [
    "all",
    ...new Set(data.map((product) => product.category)),
  ];

  const filterProducts =
    selectedCategory === "all"
      ? data
      : data.filter((product) => product.category === selectedCategory);


  const onAddProduct = (product) => {
    if (allProducts.find((item) => item.id === product.id)) {
      const products = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + product.price * product.quantity);
      setCountProducts(countProducts + product.quantity);
      return setAllProducts([...products]);
    }
    setTotal(total + product.price * product.quantity);
    setCountProducts(countProducts + product.quantity);
    setAllProducts([...allProducts, product]);
  };
  return (
    <>
      <div className="container-filters">
        <h1>Filtrar por categorías: </h1>
        <select className="select-filtros"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {uniqueCategories.map((category) => (
            <option value={category} key={category}>
              {category === "all" ? "Todas las categorías" : category}
            </option>
          ))}
        </select>
      </div>
      <div className="container-items">
        {filterProducts.map((product) => (
          <div className="item" key={product.id}>
            <figure>
              <img src={product.urlImage} alt={product.name} />
            </figure>
            <div className="info-product">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <h3>Categoría: {product.category}</h3>
              <p className="price">${product.price}</p>
              <button
                className="btn-add-cart"
                onClick={() => onAddProduct(product)}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
