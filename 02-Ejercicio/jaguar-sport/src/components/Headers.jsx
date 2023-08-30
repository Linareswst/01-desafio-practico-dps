import React, { useState } from "react";

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = (product) => {
    const results = allProducts.filter((item) => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const updateProductQuantity = (product, newQuantity) => {
    const parsedQuantity = parseInt(newQuantity, 10);
    const updatedProducts = allProducts.map((item) => {
      if (item.id === product.id) {
        const updatedProduct = { ...item, quantity: parsedQuantity };
        return updatedProduct;
      }
      return item;
    });

    setAllProducts(updatedProducts);
    recalculateTotals(updatedProducts);
  };

  const recalculateTotals = (products) => {
    const newTotal = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const newCountProducts = products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );

    setTotal(newTotal);
    setCountProducts(newCountProducts);
  };

  return (
    <header>
      <h1>Jaguar Sport</h1>
      <div className="container-icon">
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <img
            src="https://i.ibb.co/gd8RMcR/pngwing-com.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
        <div
          className={`container-cart-products ${active ? "" : "hidden-cart"}`}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        <input
                          className="cantidad-producto-carrito-input"
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            updateProductQuantity(product, e.target.value)
                          }
                        />
                      </span>
                      <span className="imagen-producto-carrito">
                        <img src={product.urlImage} alt="imagen-producto" />
                      </span>
                      <p className="titulo-producto-carrito">{product.name}</p>
                      <span className="precio-producto-carrito">
                        ${product.price}
                      </span>
                    </div>
                    <img
                      src="https://i.ibb.co/FsMqpvW/trash-can.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>
              <span className="boton-vaciar-cart">
                <button className="btn-clear-all" onClick={onCleanCart}>
                  Vaciar Carrito
                </button>
              </span>
            </>
          ) : (
            <p className="cart-empty">El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
