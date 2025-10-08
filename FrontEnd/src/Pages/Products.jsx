import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./../Components/Nav";

const Products = () => {
  // safe selector with fallback to empty array
  const products = useSelector((state) => state.product?.products ?? []);

  const renderProduct = products.map((product) => {
    return (
      <div
        key={product.id}
        className="flex flex-col items-start m-auto w-40 h-54  rounded-2xl shadow-lg bg-white hover:scale-105 hover:transition duration-300 ease-in-out"
      >
        <Link
          to={`/products/${product.id}`}
          className="w-full h-40 block overflow-hidden rounded-lg mb-3"
        >
          <img
            className="w-full h-full object-contain p-2"
            src={product.image}
            alt={product.title}
          />
        </Link>

        <div className="mt-auto w-full px-2 mb-2">
          <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
          <span className="text-lg font-semibold">₹ {product.price}</span>
        </div>

        <Link
          to={`/products/${product.id}`}
          className="text-sm text-white bg-black w-full rounded-b-2xl text-center p-2 hover:text-amber-300"
        >
          View
        </Link>
      </div>
    );
  });

  return products.length > 0 ? (
    <>
      <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center pb-36">
        {renderProduct}
      </div>
      <Nav />
    </>
  ) : (
    <>
      <div className="p-6">Loading....</div>
      <Nav />
    </>
  );
};

export default Products;
