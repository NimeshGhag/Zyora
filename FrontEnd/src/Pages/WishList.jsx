import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import WishTemp from "../Components/WishTemp";

const WishList = () => {
  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);
  const navigate = useNavigate();

  const wishlistProducts = (user?.wishlist ?? [])
    .map((w) => products.find((p) => String(p.id) === String(w.productId)))
    .filter(Boolean);

 
  return (
    <>
      <div className="flex justify-between items-center px-3 py-3 mb-5 fixed top-0 right-0 left-0 z-60 bg-white/30 backdrop-blur-xs ">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>

        <h1 className="text-xl cursor-pointer">WishList</h1>

        <button
          onClick={() => navigate("/cart")}
          className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-shopping-cart-line text-2xl"></i>
        </button>
      </div>

      <div className="p-5 min-h-screen pb-66 relative mt-8">
        {/* safe cart array (avoid crash if user or user.cart is undefined) */}

        {!user || !user.wishlist || !user.wishlist.length ? (
          <div className="text-center p-6 flex flex-col gap-3 items-center">
            <h1>You don't have any Favourite. </h1>
            <button
              className="bg-black text-white p-3 w-50 cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out"
              onClick={() => navigate("/products")}
            >
              Continue Shoping
            </button>
          </div>
        ) : (
          <div className="m-3 flex flex-col  gap-4 justify-center pb-10">
            {wishlistProducts.map((product) => (
              <WishTemp key={product.id} product={product} />
            ))}
          </div>
        )}

        <Nav />
      </div>
    </>
  );
};

export default WishList;
