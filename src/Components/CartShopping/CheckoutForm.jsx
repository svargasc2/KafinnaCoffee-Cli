import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";

function CheckoutForm() {
  const { cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    city: "",
  });

  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Formatear precios como COP
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  // Obtener todos los municipios y departamentos de Colombia
  useEffect(() => {
    const fetchDepartmentsAndCities = async () => {
      try {
        const response = await fetch(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const data = await response.json();

        const departmentSet = new Set(data.map((item) => item.departamento));
        const departmentList = Array.from(departmentSet).sort();
        setDepartments(departmentList);
      } catch (error) {
        console.error("Error fetching departments and cities:", error);
      }
    };

    fetchDepartmentsAndCities();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      const fetchCities = async () => {
        try {
          const response = await fetch(
            `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${selectedDepartment}`
          );
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };

      fetchCities();
    }
  }, [selectedDepartment]);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field !== ""
    );
    setIsFormComplete(allFieldsFilled);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Datos para enviar al backend
    const paymentData = {
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:10101/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const { init_point } = await response.json();

      // Redirigir al usuario a Mercado Pago para realizar el pago
      window.location.href = init_point;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un error al procesar el pago.");
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#24250e]">
        Llena los campos a donde se realizara el envío
      </h2>

      <div className="bg-[#4f5024] text-white p-6 rounded-md shadow-lg mb-8">
        <h3 className="text-2xl font-semibold text-white mb-4">Pre-Factura</h3>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-300 mt-4 pt-4">
          <p className="text-xl font-bold text-white">
            Total: {formatCurrency(totalPrice)}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#e5e1b1] p-6 rounded-md shadow-lg"
      >
        <div className="grid grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="name">
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo Correo */}
          <div>
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="email"
            >
              Correo:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo Teléfono */}
          <div>
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="phone"
            >
              Teléfono:
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo Dirección */}
          <div>
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="address"
            >
              Dirección Completa:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Campo Departamento */}
          <div>
            <label
              className="block text-gray-700 font-semibold"
              htmlFor="department"
            >
              Departamento:
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                handleInputChange(e);
              }}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecciona un departamento</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* Campo Ciudad */}
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="city">
              Ciudad:
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={!selectedDepartment}
              required
            >
              <option value="">Selecciona una ciudad</option>
              {cities.map((city, index) => (
                <option key={index} value={city.municipio}>
                  {city.municipio}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Botón de Enviar */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`p-3 mt-4 text-white rounded-md ${
              isFormComplete ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Pagar ahora
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutForm;
