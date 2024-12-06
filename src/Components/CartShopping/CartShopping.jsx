import React, { useContext, useState } from "react";
import NavbarMenu from "../NavbarMenu/NavbarMenu";
import Footer from "../Footer/Footer";
import { CartContext } from "../../Context/CartContext/CartContext";

function CartShopping() {
  const { cartItems, updateQuantity, clearCart } = useContext(CartContext);

  // Estado para manejar la carga durante la compra
  const [isLoading, setIsLoading] = useState(false);

  // Formatear el precio como pesos colombianos
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  // Calcular el total
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Manejar el clic en "Comprar"
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:10101/pay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point;
      } else {
        console.error(data.error);
        alert("Hubo un error al procesar el pago");
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Hubo un error al procesar el pago");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarMenu />
      <div className="container mx-auto my-8 min-h-[37vh]">
        <h2 className="text-4xl text-[#302218] font-bold text-center mb-4">
          Carrito de Compras
        </h2>
        {cartItems.length > 0 ? (
          <>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#614a32] text-white">
                  <th className="border border-[#302218] p-2">Producto</th>
                  <th className="border border-[#302218] p-2">Nombre</th>
                  <th className="border border-[#302218] p-2">Precio</th>
                  <th className="border border-[#302218] p-2">Cantidad</th>
                  <th className="border border-[#302218] p-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="hover:bg-[#ecead5]">
                    <td className="border border-[#302218] p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="border border-[#302218] p-2">{item.name}</td>
                    <td className="border border-[#302218] p-2">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="border border-[#302218] p-2">
                      <div className="flex justify-center items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 bg-[#8f743f] text-white rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 bg-[#8f743f] text-white rounded"
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
                <tr className="bg-[#614a32] text-white border border-[#302218]">
                  <td colSpan="4" className="text-right font-bold p-2">
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
                onClick={handlePurchase}
                className="bg-green-600 text-white px-4 py-2 rounded-md font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Comprar"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">El carrito está vacío.</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default CartShopping;
