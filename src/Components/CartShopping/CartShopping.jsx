import React, { useContext, useEffect, useState } from "react";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import Footer from "../Footer/Footer";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useProducts } from "../../Context/ProductsContext/ProductsContext";
import CheckoutForm from "./CheckoutForm";

function CartShopping() {
  const { cartItems, updateQuantity, clearCart } = useContext(CartContext);
  const [productImages, setProductImages] = useState({});
  const { products, getProducts, getImagesByProductId } = useProducts();
  const [isCheckout, setIsCheckout] = useState(false); // Estado para alternar entre carrito y formulario

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

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <NavbarMenu />
      <div className="container mx-auto my-8 min-h-[37vh]">
        {isCheckout ? (
          // Mostrar formulario de envío si el usuario seleccionó "Comprar"
          <>
            <CheckoutForm />
            <div className="text-center mt-4">
              <button
                onClick={() => setIsCheckout(false)} // Cambiar a la vista del carrito
                className="bg-red-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          // Mostrar el carrito de compras
          <>
            <h2 className="text-4xl text-[#24250e] font-bold text-center mb-4">
              Carrito de Compras
            </h2>
            {cartItems.length > 0 ? (
              <>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-[#636427] text-white">
                      <th className="border border-[#302218] p-2">Producto</th>
                      <th className="border border-[#302218] p-2">Nombre</th>
                      <th className="border border-[#302218] p-2">Talla</th>
                      <th className="border border-[#302218] p-2">Color</th>
                      <th className="border border-[#302218] p-2">Precio</th>
                      <th className="border border-[#302218] p-2">Cantidad</th>
                      <th className="border border-[#302218] p-2">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="hover:bg-[#f1eed6]">
                        <td className="flex justify-center items-center border border-[#302218] p-2">
                          <img
                            src={
                              productImages[item.id] ||
                              "https://via.placeholder.com/200"
                            }
                            alt={item.name}
                            className="w-36 object-cover"
                          />
                        </td>
                        <td className="border border-[#302218] p-2">
                          {item.name}
                        </td>
                        <td className="border border-[#302218] p-2">
                          {item.selectedSize || "N/A"}
                        </td>
                        <td className="border border-[#302218] p-2">
                          {item.selectedColor || "N/A"}
                        </td>
                        <td className="border border-[#302218] p-2">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="border border-[#302218] p-2">
                          <div className="flex justify-center items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 bg-[#636427] text-white rounded"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 bg-[#636427] text-white rounded"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="border border-[#302218] p-2">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-[#636427] text-white border border-[#302218]">
                      <td colSpan="6" className="text-right font-bold p-2">
                        Total:
                      </td>
                      <td className="text-center font-bold p-2">
                        {formatCurrency(totalPrice)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="text-center mt-4 flex justify-end gap-6">
                  <button
                    onClick={clearCart}
                    className="bg-red-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Vaciar Carrito
                  </button>
                  <button
                    onClick={() => setIsCheckout(true)} // Cambiar a la vista del formulario
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-medium"
                  >
                    Comprar
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500">El carrito está vacío.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartShopping;
