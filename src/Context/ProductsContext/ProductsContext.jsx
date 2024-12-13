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
  const [productsImages, setProductsImages] = useState({}); // Mapa de imágenes por producto

  const getProducts = async () => {
    try {
      const res = await protectedRoute().get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Error fetching products ", error);
    }
  };

  const getImagesByProductId = async (productId) => {
    try {
      const res = await protectedRoute().get(`/images-products/${productId}`);
      return res.data; // Devuelve las imágenes para el producto específico
    } catch (error) {
      console.log(`Error fetching images for product ${productId}`, error);
      return [];
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProducts,
        productsImages,
        setProductsImages,
        getImagesByProductId,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
