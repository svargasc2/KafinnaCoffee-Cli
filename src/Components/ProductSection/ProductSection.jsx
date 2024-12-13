import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ProductSection() {
  const { addToCart } = useContext(CartContext);
  const { products, getProducts, getImagesByProductId } = useProducts();
  const [productImages, setProductImages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // 4 filas con 4 columnas por fila

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
        const images = await getImagesByProductId(product.id);
        imagesMap[product.id] = images[0]?.image_url || ""; // Usa la primera imagen o un valor vacío
      }
      setProductImages(imagesMap);
    };

    if (products.length > 0) {
      fetchImages();
    }
  }, [products, getImagesByProductId]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) => product.category_name === selectedCategory
        );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const MySwal = withReactContent(Swal);

  const handleAddToCart = (product) => {
    addToCart(product);
    MySwal.fire({
      title: `<span style="color: #edebd4;">¡Producto añadido!</span>`,
      html: `<p style="color: #edebd4;">${product.name} se agregó al carrito.</p>`,
      icon: "success",
      background: "#636427",
      confirmButtonColor: "#bfb85c",
      confirmButtonText: "Aceptar",
      timer: 2000,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <NavbarMenu />
      <section className="bg-[#ffffff] py-16 px-4">
        <div className="w-[80%] mx-auto">
          <h2 className="text-4xl font-bold text-start mb-4 text-[#24250e]">
            EXPLORA NUESTROS PRODUCTOS
          </h2>
          <p className="text-lg text-start mb-12 text-[#636427]">
            Completa tu estilo en todo momento con nuestra selección de ropa,
            fragancias, y accesorios de tendencia.
          </p>
          <div className="w-full flex gap-4">
            <div className="bg-[#bfb85c] w-[20%] h-[100%] mt-6 rounded p-4">
              <h3 className="text-lg font-semibold mb-4">Filtrar:</h3>
              <ul>
                <li>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === "all"
                        ? "bg-[#636427] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    Todos
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === "T-shirts"
                        ? "bg-[#636427] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory("T-shirts")}
                  >
                    Camisetas
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === "Perfumes"
                        ? "bg-[#636427] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory("Perfumes")}
                  >
                    Fragancias
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === "Pants"
                        ? "bg-[#636427] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory("Pants")}
                  >
                    Pantalones
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left p-2 rounded ${
                      selectedCategory === "Shoes"
                        ? "bg-[#636427] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedCategory("Shoes")}
                  >
                    Tenis
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-[80%] flex justify-center">
              <div className="grid grid-cols-4 gap-10 mt-6">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#edebd4] shadow p-4 rounded"
                  >
                    <img
                      src={
                        productImages[product.id] ||
                        "https://via.placeholder.com/200"
                      }
                      alt={product.name}
                      className="w-full object-cover"
                    />
                    <h3 className="text-lg mt-4">{product.name}</h3>
                    <p className="text-xl font-semibold">
                      {formatCurrency(product.price)}
                    </p>
                    <div className="w-full flex justify-center gap-3">
                      {product.stock > 0 ? (
                        <>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#636427] text-[#edebd4] p-2 rounded-md text-[14px]"
                          >
                            Añadir al carrito
                          </button>
                          <button
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="bg-[#636427] text-[#edebd4] p-2 rounded-md text-[14px]"
                          >
                            Ver producto
                          </button>
                        </>
                      ) : (
                        <p className="text-red-600 font-semibold">
                          No disponible
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Controles de paginación */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#636427] text-white"
              }`}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="mx-4">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#636427] text-white"
              }`}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProductSection;
