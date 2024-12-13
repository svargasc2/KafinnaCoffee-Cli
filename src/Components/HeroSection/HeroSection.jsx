import React from "react";
import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  return (
    <div className="w-full bg-[#24250e] text-white text-center py-16 min-h-[80vh]">
      <h1 className="text-9xl font-bold">KAFINNA STORE</h1>
      <div className="w-full px-10 flex justify-center">
        <div className="w-[90%] grid grid-cols-3 gap-10 items-center mt-20">
          <div className="flex flex-col items-center">
            <p className="text-start text-xl">
              Estilo a tu alcance, encuentra todo en un solo lugar.
            </p>
            <button className="mt-6 bg-[#636427] text-white px-6 py-3 text-lg font-semibold rounded">
              Explora nuestros productos
            </button>
          </div>
          <div className="h-[400px] overflow-hidden">
            {/* Integración del visor Spline */}
            <Spline scene="https://prod.spline.design/QAArTQlG1eFChICs/scene.splinecode" />
          </div>
          <div className="bg-[#636427] p-4 rounded-md">
            <h1 className="font-semibold text-xl text-start pb-4">¡Es momento de darte ese gusto que mereces!</h1>
            <p className="text-start text-lg">
              Cada producto que ofrecemos está diseñado para destacar tu
              personalidad, brindarte comodidad y ayudarte a expresar quién
              eres. Desde prendas modernas y versátiles hasta fragancias que
              dejan huella, nuestra tienda tiene todo lo que necesitas para
              renovar tu guardarropa y elevar tu rutina diaria.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
