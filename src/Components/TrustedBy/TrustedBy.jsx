import React from "react";

export default function TrustedBy() {
  return (
    <>
      <div className="w-full flex flex-col justify-center text-center bg-[#f8f7ee] h-[50vh]">
        <h2 className="text-6xl font-semibold text-[#302218]">TRUSTED BY INDUSTRY LEADERS</h2>
        <p className="mt-2 text-lg font-medium text-[#553f2e]">
          With a legacy built on integrity and excellence, we've earned the
          trust of industry experts worldwide.
        </p>
        <div className="flex justify-center gap-8 mt-8">
          {/* Aquí colocarías imágenes o logos de las marcas */}
          <img src="https://via.placeholder.com/200" alt="Brand 1" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          <img src="https://via.placeholder.com/200" alt="Brand 2" className="" />
          {/* Más logos según sea necesario */}
        </div>
      </div>
    </>
  );
}
