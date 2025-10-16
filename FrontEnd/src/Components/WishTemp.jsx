import React from "react";
import { Link } from "react-router-dom";
import { deleteWishHandler } from "../utils/cartHelper";
import { asyncUpdateUser } from "../features/users/userAction";
import { useDispatch, useSelector } from "react-redux";

const WishTemp = ({ product }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user && state.user.user);

  const deleteWish = (index) => {
    // `index` here may be a product id; find its index in user's wishlist
    const id = index;
    const idx = (user?.wishlist ?? []).findIndex(
      (w) => String(w.productId) === String(id)
    );
    if (idx === -1) return;
    const newWish = deleteWishHandler(user.wishlist, idx);
    dispatch(asyncUpdateUser(user.id, { ...user, wishlist: newWish }));
  };
  
  return (
    <div
      key={product.id}
      className="flex items-center justify-around  h-30 rounded-2xl shadow-lg bg-white hover:scale-105 hover:transition duration-300 ease-in-out"
    >
      <Link
        to={`/products/${product.id}`}
        className=" h-full block overflow-hidden rounded-lg mb-3"
      >
        <img
          className="w-full h-full object-contain p-2"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="w-full px-2 mb-2">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <span className="text-lg font-semibold">₹ {product.price}</span>
      </div>

      <button
        onClick={() => deleteWish(product.id)}
        className="w-10 h-10 text-red-700 pr-5 text-center cursor-pointer rounded-full hover:bg-white"
      >
        <i className="ri-delete-bin-6-line text-2xl"></i>
      </button>
    </div>
  );
};

export default WishTemp;
