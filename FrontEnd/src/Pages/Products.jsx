import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./../Components/Nav";

const Products = () => {
  // safe selector with fallback to empty array
  const products = useSelector((state) => state.product?.products ?? []);

  const renderProduct = products.map((product) => {
    return (
      <>
        <Link
          to={`/products/${product.id}`}
          className="flex flex-col items-start   m-auto w-40 h-64 border rounded-md shadow-sm bg-white"
          key={product.id}
        >
          <div className="w-full h-40 p-4 overflow-hidden rounded-md mb-3">
            <img
              className="w-full h-full object-cover"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="mt-auto w-full  px-2 mb-2">
            <h3 className="text-sm font-medium line-clamp-2 ">
              {product.title}
            </h3>
            <span className="text-lg font-semibold">${product.price}</span>
          </div>
          <button
            to={`/products/${product.id}`}
            className="text-sm text-white cursor-pointer bg-black w-full text-center p-2 hover:text-amber-300 "
          >
            View
          </button>
        </Link>

         <Nav/>
      </>
    );
  });

  return products.length > 0 ? (
    <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center">
      {renderProduct}
    </div>
  ) : (
    "Loading...."
  );
};

export default Products;
