import React from "react";

const LoadingProduct = ({ count = 6 }) => {
  const n = Number(count) || 6;
  return Array.from({ length: n }).map((_, i) => (
    <div
      key={`ph-${i}`}
      className="flex flex-col items-start m-auto w-40 h-54 rounded-2xl shadow-lg bg-white"
    >
      <div className="w-full h-40 block overflow-hidden rounded-lg mb-3 bg-gray-200 animate-pulse" />

      <div className="mt-auto w-full px-2 mb-2">
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-3/4" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>

      <div className="text-sm text-white bg-black w-full rounded-b-2xl text-center p-2 opacity-0">
        View
      </div>
    </div>
  ));
};

export default LoadingProduct;
