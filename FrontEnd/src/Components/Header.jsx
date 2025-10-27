import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../features/search/searchSlice";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products ?? []);

  const query = useSelector((state) => state.search?.query ?? "");

  const placeholders = [
    "Search for iPhone 17",
    "Explore bags for men",
    "MackBook Air",
    "Find your favorite perfume",
  ];

  const [placeholder, setplaceholder] = useState(placeholders[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        index = (index + 1) % placeholders.length;
        setplaceholder(placeholders[index]);
        setFade(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="px-1 py-1 flex flex-col gap-1 bg-black text-white  rounded-b-[1.5rem] fixed top-0 right-0 left-0 tracking-tight z-10 lg:px-2 lg:py-2">
        <div className="w-full pr-3  pt-3 flex items-center justify-between">
          <div className="w-30 h-10 lg:w-40">
            <img
              className="w-full h-full object-cover"
              src="../../assets/ChatGPT_Image_Oct_16__2025__11_56_08_AM-removebg-preview.webp"
              alt=""
            />
          </div>
          <button
            onClick={() => navigate("/wishlist")}
            className="w-[2rem] lg:w-[3rem] grid place-items-center h-[2rem] lg:h-[3rem] rounded-full cursor-pointer hover:text-emerald-700 hover:transition duration-300 ease-in-out"
          >
            <i className="ri-heart-2-line text-2xl lg:text-3xl"></i>
          </button>
        </div>

        <div className="flex  p-1 m-2  ">
          <input
            className={`bg-transparent outline-none px-5  border font-semibold w-full py-2 lg:py-3 rounded-full placeholder:transition-opacity duration-500  ${
              fade ? "placeholder:opacity-100" : "placeholder:opacity-0"
            }`}
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder={placeholder}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
