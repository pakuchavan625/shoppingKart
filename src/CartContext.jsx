import { useState } from "react";
import { createContext } from "react";
import {  getProductData } from "./product";

export const CartContext = createContext({
  item: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

// Context ---> it holds all the things in your app for example cart, add to cart, remove from cart
// Provider ---> Gives the react app to acees the all the things in your Context

export const CartProvider = ({ children }) => {
  const [cartProduct, setCardProduct] = useState([]);

  // [{id : 1, quantity :2}, {id : 2 , quantity : 3}]

  const getProductQuantity = (id) => {
    const quantity = cartProduct.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCardProduct([
        ...cartProduct,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCardProduct(
        cartProduct.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        })
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCardProduct(
        cartProduct.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product;
        })
      );
    }
  };

  const deleteFromCart = (id) => {
    setCardProduct(
      cartProduct.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  };

 const getTotalCost = ()=>{
    let totalCost = 0;
    cartProduct.map((cartItem)=>{
        const productData = getProductData(cartItem.id)
        totalCost += (productData.price * cartItem.quantity)
    })
    return totalCost;
 }
  const contextValue = {
    item: cartProduct,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
  );
};


export  default CartProvider;



