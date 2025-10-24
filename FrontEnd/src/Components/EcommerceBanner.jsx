import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EcommerceBanner = () => {
  const navigate = useNavigate();

  // Default variant
  return (
    <section className="relative overflow-hidden mt-35 rounded-2xl bg-gradient-to-r from-amber-200 to-amber-400 p-6 md:p-12 text-black tracking-tight">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase">
            20% OFF
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">
            New arrivals — shop the drop
          </h1>
          <p className="mt-3 max-w-xl text-sm md:text-base opacity-90">
            Limited-time deals on bestsellers. Free shipping over ₹999.
          </p>

          <div className="mt-6 flex gap-3 items-center">
            <button
              onClick={() => navigate("/products")}
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 cursor-pointer hover:text-amber-300"
            >
              Shop Now
            </button>
            <button
              onClick={() => navigate("/products")}
              className="text-sm text-black underline cursor-pointer"
            >
              Explore deals
            </button>
          </div>

          <div className="mt-6 flex gap-4">
            <div className="rounded-lg bg-white/10 px-4 py-2 text-xs">
              Free returns
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2 text-xs">
              COD available
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2 text-xs">
              24×7 support
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden md:block">
          <div className="relative h-64 md:h-80 lg:h-96 w-full">
            <img
              src={"https://m.media-amazon.com/images/I/41pB1s57RNL._UF1000,1000_QL80_.jpg"}
              alt="hero"
              className="absolute inset-0 h-full w-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 left-6 flex gap-4">
              <div className="rounded-xl bg-white/90 p-3 shadow">
                <div className="text-xs font-medium">Best seller</div>
                <div className="text-sm font-semibold">Wireless Speaker</div>
                <div className="text-xs text-slate-500">From ₹2,299</div>
              </div>
              <div className="rounded-xl bg-white/90 p-3 shadow hidden lg:block">
                <img
                  src={"https://m.media-amazon.com/images/I/41pB1s57RNL._UF1000,1000_QL80_.jpg"}
                  alt="mini"
                  className="w-20 h-14 object-cover rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default EcommerceBanner;
