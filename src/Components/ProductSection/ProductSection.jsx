import React, { useContext, useEffect } from "react";
import Footer from "../Footer/Footer";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";

function ProductSection() {
  const { addToCart } = useContext(CartContext);
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Función para formatear precios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  return (
    <>
      <NavbarMenu />
      <section className="bg-[#f8f4ec] py-16 px-4">
        <div className="w-full mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-brown-800">
            EXPLORE OUR COFFEE MACHINE
          </h2>
          <p className="text-lg text-center mb-12 text-gray-700">
            Make the perfect cup every time with our precision coffee machines.
          </p>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-5 gap-10 mt-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#edebd4] shadow p-4 rounded"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover"
                  />
                  <h3 className="text-lg mt-4">{product.name}</h3>
                  <p className="text-xl font-semibold">
                    {formatCurrency(product.price)}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#302218] text-[#edebd4] p-2 rounded-md"
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductSection;
