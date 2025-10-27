import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  // select the user object from the user slice (state.user.user)
  const user = useSelector((state) => state.user && state.user.user);
  return (
    <nav className="flex gap-2 items-center justify-around p-5 m-3 bg-black text-white rounded-[4rem] fixed bottom-0 right-0 left-0 cursor-pointer shadow-lg z-10 backdrop-blur-sm " >
      <NavLink
        className={({ isActive }) => (isActive ? "text-amber-300" : "")}
        to="/"
      >
        <i className="ri-home-2-line text-2xl md:text-3xl lg:text-4xl"></i>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-amber-300" : "")}
        to="/products"
      >
        <i className="ri-store-2-line text-2xl md:text-3xl  lg:text-4xl"></i>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-amber-300" : "")}
        to="/cart"
      >
        <i className="ri-shopping-cart-line text-2xl md:text-3xl  lg:text-4xl"></i>
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-amber-300" : "")}
        to="/account"
      >
        <i className="ri-user-line text-2xl md:text-3xl  lg:text-4xl"></i>
      </NavLink>
    </nav>
  );
};

export default Nav;
