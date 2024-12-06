import React from "react";
import Spline from "@splinetool/react-spline";


export default function HeroSection() {
  return (
    <div className="w-full bg-[#302218] text-white text-center py-16 h-[80vh]">
      <h1 className="text-9xl font-bold">KAFINNA COFFEE</h1>
      <div className="w-full flex justify-center">
        <div className="w-[80%] grid grid-cols-3 justify-center items-center mt-20">
          <div>
            <p className="text-start text-lg">
              Discover the secret to making coffee shop-worthy coffee at home
              with a coffee espresso machine.
            </p>
            <button className="mt-6 bg-white text-black px-6 py-2 font-semibold rounded">
              Explore Coffee Machine
            </button>
          </div>
          <div className="h-[400px]">
            {/* Integración del visor Spline */}
            <Spline scene="https://prod.spline.design/JS0CUQyKsQXJ5xOM/scene.splinecode" />
          </div>
          <div className="bg-[#553f2e] p-4 rounded-md">
            <h1 className="font-semibold text-xl text-start">NOVA SIMONELLI</h1>
            <p className="text-start text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              consectetur nesciunt officia recusandae assumenda consequuntur
              praesentium voluptas ducimus laboriosam incidunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
