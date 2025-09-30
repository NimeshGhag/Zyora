import React from "react";
import Login from "./Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncLogOutUser } from "../features/users/userAction";
import Nav from './../Components/Nav';

const Account = () => {
  const user = useSelector((state) => state.user && state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productHandler =()=>{
    navigate("/create-product")
  }

  const logOutHandler = (user)=>{
    dispatch(asyncLogOutUser());
    navigate("/logIn")
  }

  return (
    <>
      {user ? (
        <>
          <div className="flex items-center gap-5 px-5 py-5 bg-amber-200 m-2 rounded-xl ">
            <img
              className="w-10 h-10"
              src="https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-download-in-svg-png-gif-file-formats--person-girl-business-pack-illustrations-6515859.png?f=webp"
              alt=""
            />
            <div>
              <h1 className="text-xl">{user.userName}</h1>
              <h3 className="text-sm text-gray-500">{user.email}</h3>
            </div>
          </div>

          <div className="flex flex-col  items-center px-5 mx-2 bg-gray-100  rounded-xl  ">
            <div className="w-full py-2 flex gap-1 justify-around ">
              <button className="border-gray-300 border-1 px-6 py-2 rounded-lg w-[50%] cursor-pointer hover:bg-black hover:text-white hover:transition duration-300 ease-in-out">
                <i className="ri-box-3-line text-emerald-700"></i> Orders
              </button>
              <button className="border-gray-300 border-1 px-6 py-2 rounded-lg w-[50%] cursor-pointer hover:bg-black hover:text-white hover:transition duration-300 ease-in-out">
                <i className="ri-heart-2-line text-emerald-700"></i> Wishlist
              </button>
            </div>

            <div className="w-full py-2 flex gap-2 justify-around ">
              <button className="border-gray-300 border-1 px-6 py-2 rounded-lg w-[50%] cursor-pointer hover:bg-black hover:text-white hover:transition duration-300 ease-in-out">
                <i className="ri-gift-line text-emerald-700"></i> Coupons
              </button>
              <button className="border-gray-300 border-1 px-6 py-2 rounded-lg w-[50%] cursor-pointer hover:bg-black hover:text-white hover:transition duration-300 ease-in-out">
                <i className="ri-customer-service-2-fill text-emerald-700"></i>{" "}
                Help
              </button>

            
            </div>
          </div>

          <div className="px-5 flex flex-col gap-2 mt-5">
            {user?.isAdmin && (
              <>
                <button onClick={productHandler} className=" bg-black text-white px-6 py-2 rounded-lg w-full cursor-pointer  hover:text-amber-300 hover:transition duration-300 ease-in-out">
                  Create Product
                </button>
              </>
            )}

            <button onClick={logOutHandler} className=" bg-black text-white px-6 py-2 rounded-lg w-full cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out">
              <i className="ri-logout-box-r-line"></i> Sign out
            </button>
          </div>
        </>
      ) : (
        <div>
          <Login />
        </div>
      )}

      <Nav/>
    </>
  );
};

export default Account;
