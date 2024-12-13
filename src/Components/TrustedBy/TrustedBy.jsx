import React from "react";

export default function TrustedBy() {
  return (
    <>
      <div className="w-full flex flex-col justify-center text-center bg-[#f9f8ec] min-h-[50vh]">
        <h2 className="text-6xl font-semibold text-[#24250e]">
          CONTAMOS CON LAS MARCAS EN TENDENCIA
        </h2>
        <p className="mt-2 text-lg font-medium text-[#636427]">
          Con las marcas en tendencia para que siempre estés a la moda,
          destacando tu estilo con lo mejor del momento.
        </p>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {/* Aquí colocarías imágenes o logos de las marcas */}
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 1"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          <img
            src="https://via.placeholder.com/200"
            alt="Brand 2"
            className=""
          />
          {/* Más logos según sea necesario */}
        </div>
      </div>
    </>
  );
}
