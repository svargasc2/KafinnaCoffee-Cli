import React from "react";
import Spline from "@splinetool/react-spline";

export default function ProductSpecs() {
  return (
    <div className="w-full flex justify-center items-center bg-[#302218] text-white text-center py-16 h-[60vh]">
      <div className="w-[80%] flex justify-center items-center">
        <div className="w-[50%] flex flex-col items-start">
          <h2 className="text-4xl font-semibold">
            LATEST PRODUCT SPECS FROM OUR SHOP
          </h2>
          <p className="text-xl text-start mt-2">
            Explore one of the specifications of our newest products designed to
            take your coffee experience to the next level.
          </p>
          <div className="w-full flex flex-col gap-3 mt-8">
            <div className="flex flex-col items-start border-l-[#dbd5ad] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                54MM PORTAFILTER STAINLESS
              </h3>
              <p className="mt-4 text-md">
                Stainless steel ensures enhanced flavor with dual spout and
                single spout.
              </p>
            </div>
            <div className="flex flex-col items-start border-l-[#dbd5ad] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                54MM PORTAFILTER STAINLESS
              </h3>
              <p className="mt-4 text-md">
                Stainless steel ensures enhanced flavor with dual spout and
                single spout.
              </p>
            </div>
            <div className="flex flex-col items-start border-l-[#dbd5ad] border-l-[8px] p-6 rounded">
              <h3 className="text-lg font-semibold">
                54MM PORTAFILTER STAINLESS
              </h3>
              <p className="mt-4 text-md">
                Stainless steel ensures enhanced flavor with dual spout and
                single spout.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[46%] h-[400px]">
          <Spline scene="https://prod.spline.design/JS0CUQyKsQXJ5xOM/scene.splinecode" />
          {/* <Spline scene="https://prod.spline.design/XQc5jBDTWnbQXAh4/scene.splinecode" /> */}
        </div>
      </div>
    </div>
  );
}
