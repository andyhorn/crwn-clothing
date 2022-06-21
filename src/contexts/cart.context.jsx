import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  setCartCount: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const deleteItemFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  useEffect(() => setCartCount(getCartCount(cartItems)), [cartItems]);
  useEffect(() => setCartTotal(getCartTotal(cartItems)), [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const addCartItem = (cartItems, productToAdd) => {
  const exists = cartItems.some((item) => item.id === productToAdd.id);

  if (exists) {
    return cartItems.map((item) => {
      if (item.id === productToAdd.id) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  const exists = cartItems.some((item) => item.id === productToRemove.id);

  if (!exists) {
    return [...cartItems];
  }

  return cartItems
    .map((item) => {
      if (item.id === productToRemove.id) {
        return { ...item, quantity: item.quantity - 1 };
      }

      return item;
    })
    .filter((item) => item.quantity);
};

const getCartCount = (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.quantity, 0);

const getCartTotal = (cartItems) =>
  cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
