import React from "react";
import Spline from "@splinetool/react-spline";

export default function ProductSpecs() {
  return (
    <div className="w-full flex justify-center items-center bg-[#24250e] text-white text-center py-16 min-h-[70vh]">
      <div className="w-[80%] flex justify-center items-center">
        <div className="w-[50%] flex flex-col">
          <h2 className="text-4xl font-semibold text-start">
            COSAS QUE DEBES SABER DE NUESTROS PRODUCTOS
          </h2>
          <p className="text-xl text-start mt-2">
            Explora nuestros productos más nuevos para llevar tu experiencia al
            siguiente nivel.
          </p>
          <div className="w-full flex flex-col gap-3 mt-8">
            <div className="flex flex-col items-start border-l-[#636427] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                Material de Alta Calidad
              </h3>
              <p className="mt-4 text-md text-start">
                Los productos están fabricados con materiales premium, como
                algodón orgánico en ropa, piel genuina en zapatos y esencias
                naturales en perfumes, garantizando durabilidad y lujo.
              </p>
            </div>
            <div className="flex flex-col items-start border-l-[#636427] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                Diseño Funcional y Estético
              </h3>
              <p className="mt-4 text-md text-start">
                Incorporan diseños que equilibran estilo y practicidad: cortes
                clásicos en ropa, ergonomía en zapatos y presentaciones
                elegantes en perfumes.
              </p>
            </div>
            <div className="flex flex-col items-start border-l-[#636427] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                Detalles que Marcan la Diferencia
              </h3>
              <p className="mt-4 text-md text-start">
                Acabados como costuras reforzadas, suelas antideslizantes y
                atomizadores de precisión aseguran una experiencia superior en
                cada producto.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[46%] h-[400px]">
          <Spline scene="https://prod.spline.design/lkhXY94II9oy53Zo/scene.splinecode" />
        </div>
      </div>
    </div>
  );
}
