import React, { useEffect, useState } from "react";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function ProductGallery() {
  const { products, getProducts, getImagesByProductId } = useProducts();
  const [productImages, setProductImages] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsAndImages = async () => {
      await getProducts();
    };
    fetchProductsAndImages();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesMap = {};
      for (const product of products) {
        console.log("Fetching images for product ID:", product.id);
        const images = await getImagesByProductId(product.id);

        if (images.length === 0) {
          console.log(`No images found for product ID: ${product.id}`);
        }

        imagesMap[product.id] = images[0]?.image_url || ""; // Usa la primera imagen o un valor vacío
      }
      setProductImages(imagesMap);
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products, getImagesByProductId]);

  // Función para formatear los precios en pesos colombianos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center text-center py-8 min-h-[50vh] bg-white">
        <div className="w-[80%] flex flex-col items-start">
          <h2 className="text-6xl font-semibold text-[#24250e]">
            EXPLORA NUESTROS PRODUCTOS
          </h2>
          <p className="text-lg font-semibold mt-2 text-[#636427]">
            Completa tu estilo en todo momento con nuestra selección de ropa,
            fragancias, y accesorios de tendencia.
          </p>
        </div>
        <div className="w-[80%] flex justify-center">
          <div className="flex justify-center gap-4 mt-6">
            {products.slice(0, 5).map((product, index) => (
              <div
                key={index}
                className="bg-[#edebd4] shadow p-4 rounded w-1/4"
              >
                <img
                  src={
                    productImages[product.id] ||
                    "https://via.placeholder.com/200"
                  }
                  alt={product.name}
                  className="w-full object-cover"
                />
                <h3 className="text-lg mt-4 text-start">{product.name}</h3>
                {/* Mostrar el precio con formato COP */}
                <p className="text-xl font-semibold text-start">
                  {formatCurrency(product.price)}
                </p>
                <button
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="flex bg-[#24250e] text-[#edebd4] p-2 rounded-md"
                >
                  Ver producto
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[80%] flex justify-around items-center py-12">
          <p className="w-[50%] text-start text-lg font-medium text-[#636427]">
            Cada artículo está cuidadosamente seleccionado para ofrecerte
            calidad, estilo y comodidad, ayudándote a expresar tu personalidad
            en cualquier ocasión. <br />
            ¡Transforma tu look y siéntete increíble con lo mejor del momento!
          </p>
          <button className="bg-[#24250e] text-white rounded-md text-xl py-3 w-[12%]">
            <a href="/products">Ver más</a>
          </button>
        </div>
      </div>
    </>
  );
}
