import { createContext, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  coffeeProducts,
  homewares,
  cookware,
  bakeware,
} from "../data/productsList";

export const ShopContext = createContext(null);

const getAllProducts = () => [
  ...coffeeProducts,
  ...homewares,
  ...cookware,
  ...bakeware,
];

const loadCartFromStorage = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : {};
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const ShopContextProvider = ({ children }) => {
  const allProducts = useMemo(getAllProducts, []);
  const [cartItems, setCartItems] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = loadCartFromStorage();
    setCartItems(storedCart);
  }, []);

  const getProductById = (productId) =>
    allProducts.find((product) => product.id === productId);

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce(
      (totalAmount, [productId, quantity]) => {
        const productInfo = getProductById(productId);
        return totalAmount + (productInfo ? quantity * productInfo.price : 0);
      },
      0
    );
  };

  const getTotalCartCount = () => {
    return Object.values(cartItems).reduce(
      (totalCount, quantity) => totalCount + quantity,
      0
    );
  };

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const newCart = {
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      };
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const currentQty = prev[productId] || 0;
      if (currentQty <= 1) {
        // Remove the item completely if quantity is 1 or less
        const { [productId]: _, ...newCart } = prev;
        saveCartToStorage(newCart);
        console.log(`Removed product ${productId} from cart`);
        return newCart;
      } else {
        const newCart = {
          ...prev,
          [productId]: currentQty - 1,
        };
        saveCartToStorage(newCart);
        console.log(
          `Decreased quantity of product ${productId} to ${newCart[productId]}`
        );
        return newCart;
      }
    });
  };

  //remove entire product from cart

  const removeEntireItemFromCart = (productId) => {
    setCartItems((prev) => {
      const { [productId]: _, ...newCart } = prev;
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const updateCartItemCount = (newAmount, productId) => {
    setCartItems((prev) => {
      const newCart = {
        ...prev,
        [productId]: Math.max(0, newAmount),
      };
      saveCartToStorage(newCart);
      return newCart;
    });
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    removeEntireItemFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    getTotalCartCount,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
