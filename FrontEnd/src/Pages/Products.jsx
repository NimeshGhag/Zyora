import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./../Components/Nav";
import axios from "../Api/axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  // safe selector with fallback to empty array
  // const products = useSelector((state) => state.product?.products ?? []);

  const [products, setproducts] = useState([]);
  const [hasmore, sethasmore] = useState(true);
  const [loading, setLoading] = useState(false);

  const FetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/products?_limit=6&_start=${products.length}`
      );

      if (data.length === 0) {
        sethasmore(false);
      } else {
        sethasmore(true);
        setproducts([...products, ...data]);
      }
    } catch (error) {
      console.error("FetchProducts error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProducts();
  }, []);

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

  const renderPlaceholders = (count = 8) => {
    return Array.from({ length: count }).map((_, i) => (
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

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={FetchProducts}
      hasMore={hasmore}
      loader={
        <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center pb-36">
          {renderPlaceholders(4)}
        </div>
      }
      endMessage={
        <p style={{ textAlign: "center", paddingBottom:'10rem' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <>
        <div className="m-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center pb-10">
          {products.length === 0 && loading ? renderPlaceholders(8) : renderProduct}
        </div>
        <Nav />
      </>
    </InfiniteScroll>
  );
};

export default Products;
