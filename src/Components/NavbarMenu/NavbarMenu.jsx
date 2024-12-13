import React from "react";

function NavbarMenu() {
  return (
    <>
      <header className="w-full flex justify-center bg-[#24250e] min-h-[20vh]">
        <nav className="w-[80%] flex justify-center py-4 items-center">
          <div className="w-[30%] flex items-center gap-4">
            <img src="https://via.placeholder.com/150" className="rounded-full" alt="" />
            <h1 className="text-white text-lg font-semibold">Kafinna Store</h1>
          </div>
          <ul className="w-[60%] flex justify-evenly">
            <li className="text-white text-lg font-semibold"><a href="/">Inicio</a></li>
            <li className="text-white text-lg font-semibold"><a href="/products">Productos</a></li>
            <li className="text-white text-lg font-semibold">Contacto</li>
          </ul>
          <button className="border-[1px] bg-[#ffff] border-[#302218] rounded-md py-4 w-52"><a href="/cart">Carrito</a></button>
        </nav>
      </header>
    </>
  );
}

export default NavbarMenu;
