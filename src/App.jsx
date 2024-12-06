import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ProductSection from "./Components/ProductSection/ProductSection";
import CartShopping from "./Components/CartShopping/CartShopping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<ProductSection/>} />
        <Route path="/cart" element={<CartShopping/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
