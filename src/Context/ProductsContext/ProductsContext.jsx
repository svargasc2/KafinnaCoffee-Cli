import React, { createContext, useContext, useState } from "react";
import { protectedRoute } from "../../api/auth";

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await protectedRoute().get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products ", error);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
