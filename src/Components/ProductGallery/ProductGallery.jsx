import React, { useEffect } from "react";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";

export default function ProductGallery() {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Función para formatear los precios en pesos colombianos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center text-center py-8 bg-white">
        <div className="w-[80%] flex flex-col items-start">
          <h2 className="text-6xl font-semibold text-[#302218]">
            EXPLORE OUR COFFEE MACHINE
          </h2>
          <p className="text-lg font-semibold mt-2 text-[#553f2e]">
            Make the perfect cup every time with our precision coffee machines.
          </p>
        </div>
        <div className="w-[80%] flex justify-center">
          <div className="flex justify-center gap-4 mt-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-[#edebd4] shadow p-4 rounded w-1/4"
              >
                <img
                  src="https://via.placeholder.com/200"
                  alt={product.name}
                  className="w-full object-cover"
                />
                <h3 className="text-lg mt-4 text-start">{product.name}</h3>
                {/* Mostrar el precio con formato COP */}
                <p className="text-xl font-semibold text-start">
                  {formatCurrency(product.price)}
                </p>
                <button className="flex bg-[#302218] text-[#edebd4] p-2 rounded-md">
                  Ver producto
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[80%] flex justify-around py-12">
          <p className="w-[60%] text-start text-lg font-medium text-[#553f2e]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            quod voluptatum facilis vero dolores saepe enim sit sunt facere?
            Porro obcaecati aut hic quae placeat?
          </p>
          <button className="bg-[#302218] text-white rounded-md py-4 w-52">
            <a href="/products">Ver más</a>
          </button>
        </div>
      </div>
    </>
  );
}
