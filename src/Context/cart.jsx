import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth.jsx";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const {auth} = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingcart = localStorage.getItem("PushPakCart");
    if (existingcart) {
      setCart(JSON.parse(existingcart).map(item => ({ ...item, quantity: item.quantity || 1 })));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
