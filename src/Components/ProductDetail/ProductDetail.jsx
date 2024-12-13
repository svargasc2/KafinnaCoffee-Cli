import React, { useContext, useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "animate.css";

function ProductDetail() {
  const { products, getProducts, getImagesByProductId } = useProducts();
  const { addToCart } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImage, setProductImage] = useState("");
  const [relatedImages, setRelatedImages] = useState({});

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!products.length) {
        await getProducts();
      }

      const currentProduct = products.find(
        (product) => product.id === parseInt(productId)
      );
      setProduct(currentProduct);

      if (currentProduct) {
        const images = await getImagesByProductId(currentProduct.id);
        setProductImage(images[0]?.image_url || "");

        const related = products.filter(
          (p) =>
            p.category_name === currentProduct.category_name &&
            p.id !== currentProduct.id
        );
        setRelatedProducts(related);

        // Obtener las imágenes para los productos relacionados
        const imagesMap = {};
        for (const relatedProduct of related) {
          const images = await getImagesByProductId(relatedProduct.id);
          imagesMap[relatedProduct.id] =
            images[0]?.image_url || "https://via.placeholder.com/200";
        }
        setRelatedImages(imagesMap);

        try {
          const response = await fetch(
            `http://localhost:10101/products/${productId}`
          );
          const data = await response.json();
          if (data && data.details) {
            setProductDetails(data.details);
          }
        } catch (error) {
          console.error("Error al obtener detalles del producto:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId, products, getProducts, getImagesByProductId]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const isAddToCartDisabled =
    !selectedSize ||
    !selectedColor ||
    (selectedSize &&
      productDetails.sizes.find((size) => size.size === selectedSize)?.stock ===
        0) ||
    (selectedColor &&
      productDetails.colors.find((color) => color.color === selectedColor)
        ?.stock === 0);

  if (!product) {
    return <p>Cargando producto...</p>;
  }

  return (
    <>
      <NavbarMenu />
      <section className="bg-[#ffffff] py-16 px-4">
        <div className="w-[80%] mx-auto">
          <div className="flex gap-10">
            {/* Imagen y detalles del producto */}
            <div className="w-[50%]">
              <img
                src={productImage || "https://via.placeholder.com/400"}
                alt={product.name}
                className="w-full object-cover rounded"
              />
            </div>
            <div className="w-[50%]">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-xl font-semibold mb-4">
                {formatCurrency(product.price)}
              </p>
              <p className="mb-6">{product.description}</p>

              {productDetails && (
                <div className="mb-6">
                  {product.category_name === "Shoes" && (
                    <>
                      <div>
                        <label>
                          <strong>Talla:</strong>
                        </label>
                        <select onChange={handleSizeChange}>
                          <option value="">Selecciona una talla</option>
                          {productDetails.sizes &&
                            productDetails.sizes.map((size, index) => (
                              <option key={index} value={size.size}>
                                {size.size}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-4">
                        <label>
                          <strong>Color:</strong>
                        </label>
                        <select onChange={handleColorChange}>
                          <option value="">Selecciona un color</option>
                          {productDetails.colors &&
                            productDetails.colors.map((color, index) => (
                              <option key={index} value={color.color}>
                                {color.color}
                              </option>
                            ))}
                        </select>
                      </div>
                    </>
                  )}

                  {product.category_name === "Pants" && (
                    <>
                      <div>
                        <label>
                          <strong>Talla:</strong>
                        </label>
                        <select onChange={handleSizeChange}>
                          <option value="">Selecciona una talla</option>
                          {productDetails.sizes &&
                            productDetails.sizes.map((size, index) => (
                              <option
                                key={index}
                                value={size.size}
                                disabled={size.stock === 0} // Deshabilita si no hay stock
                              >
                                {size.size}{" "}
                                {size.stock === 0 && "(No disponible)"}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="mt-4">
                        <label>
                          <strong>Color:</strong>
                        </label>
                        <select onChange={handleColorChange}>
                          <option value="">Selecciona un color</option>
                          {productDetails.colors &&
                            productDetails.colors.map((color, index) => (
                              <option
                                key={index}
                                value={color.color}
                                disabled={color.stock === 0} // Deshabilita si no hay stock
                              >
                                {color.color}{" "}
                                {color.stock === 0 && "(No disponible)"}
                              </option>
                            ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  addToCart({ ...product, selectedSize, selectedColor });
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
                }}
                disabled={isAddToCartDisabled}
                className="bg-[#636427] text-[#edebd4] p-3 rounded-md"
              >
                {isAddToCartDisabled
                  ? "Selecciona una opción para agregar"
                  : "Añadir al carrito"}
              </button>
            </div>
          </div>

          {/* Productos relacionados */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Te puede interesar</h2>
            <div className="grid grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-[#edebd4] shadow p-4 rounded"
                >
                  <img
                    src={
                      relatedImages[relatedProduct.id] ||
                      "https://via.placeholder.com/200"
                    }
                    alt={relatedProduct.name}
                  />
                  <h3 className="text-lg">{relatedProduct.name}</h3>
                  <p className="text-lg font-semibold mb-2">
                    {formatCurrency(relatedProduct.price)}
                  </p>
                  <button
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    className="bg-[#636427] text-[#edebd4] p-2 rounded-md"
                  >
                    Ver producto
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

export default ProductDetail;
