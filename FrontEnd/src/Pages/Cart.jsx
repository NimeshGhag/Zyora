import { useNavigate } from "react-router-dom";
import Nav from "./../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../features/users/userAction";
import { useMemo } from "react";
import {
  calculateCartDataHelper,
  decerseQnty,
  deleteProductHandler,
  increseQnty,
} from "../utils/cartHelper";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);

  const increseQntHandler = (index) => {
    const newCart = increseQnty(user.cart, index);
    dispatch(asyncUpdateUser(user.id, { ...user, cart: newCart }));
  };

  const decreseQntHandler = (index) => {
    const newCart = decerseQnty(user.cart, index);
    dispatch(asyncUpdateUser(user.id, { ...user, cart: newCart }));
  };

  const deleteproduct = (index) => {
    const newCart = deleteProductHandler(user.cart, index);
    dispatch(asyncUpdateUser(user.id, { ...user, cart: newCart }));
  };

  // memoized normalized cart items and total price
  const { cartItems, totalPrice, shipping } = useMemo(() => {
    return calculateCartDataHelper(user, products);
  }, [user?.cart, products]);

  return (
    <>
      <div className="flex justify-between items-center px-3 lg:px-4 py-3 lg:py-4 mb-5 fixed top-0 right-0 left-0 z-60 bg-white/30 backdrop-blur-xs ">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-arrow-left-line text-2xl lg:text-3xl"></i>
        </button>

        <h1 className="text-xl  lg:text-2xl cursor-pointer">Cart</h1>

        <button
          onClick={() => navigate("/wishlist")}
          className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-red-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-heart-2-line text-2xl lg:text-3xl"></i>
        </button>
      </div>

      <div className="p-5 min-h-screen pb-66 relative mt-8 md:mt-11 lg:mt-13 lg:mb-10 2xl:mb-80">
        {/* safe cart array (avoid crash if user or user.cart is undefined) */}

        {!user || !user.cart || !user.cart.length ? (
          <div className="text-center p-6 flex flex-col gap-3 items-center">
            <h1>Your cart is empty. </h1>
            <button
              className="bg-black text-white p-3 w-50 cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out"
              onClick={() => navigate("/products")}
            >
              Continue Shoping
            </button>
          </div>
        ) : (
          cartItems.map((it) => {
            const { product, quantity, cartIndex } = it;

            return (
              <div
                key={product.id}
                className="mb-3 bg-gray-200 p-2 flex justify-between items-center rounded-2xl relative"
              >
                <div className="flex w-full">
                  <img
                    className="h-[10vmax] w-[10vmax] rounded-2xl object-cover"
                    src={product.image ?? ""}
                    alt={product.title ?? ""}
                  />

                  <div className="flex flex-col p-3 lg:p-2 lg:gap-2 ">
                    <h1 className="lg:text-xl">{product.title}</h1>
                    <h2 className="lg:text-xl">₹ {product.price}</h2>
                  </div>
                </div>

                <div className="flex items-center justify-around p-2">
                  <button
                    onClick={() => decreseQntHandler(cartIndex)}
                    className="text-3xl cursor-pointer"
                  >
                    -
                  </button>

                  <div className="mx-3 w-[2rem] text-center bg-black rounded-full text-amber-300">
                    <h1 className="text-2xl">{quantity}</h1>
                  </div>

                  <button
                    onClick={() => increseQntHandler(cartIndex)}
                    className="text-3xl cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => deleteproduct(cartIndex)}
                  className="w-6 h-6 text-red-700 absolute top-2 right-2 text-center cursor-pointer rounded-full hover:bg-white"
                >
                  <i className="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>
            );
          })
        )}

        {cartItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-10">
            <div className="bg-amber-300  w-full h-70 md:h-72 lg:h-78 rounded-t-[4rem]">
              <div
                className=" bg-amber-100  p-3 m-3 absolute top-10 left-0 right-0 flex lg:gap-1 flex-col items-start 
              rounded-2xl  "
              >
                <div className=" flex justify-between items-center w-full  ">
                  <h2 className="text-lg md:text-xl lg:text-2xl">
                    Selected Items
                  </h2>
                  <p className="text-sm md:text-xl  opacity-80">
                    {cartItems.length} item(s)
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-md md:text-lg lg:text-xl">
                    Shipping Fee
                  </h2>
                  <p>₹{shipping}</p>
                </div>
                <div className="h-[1px] w-full bg-black my-3"></div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-xl md:text-2xl">Total</h1>

                  <p className="text-xl md:text-2xl">
                    ₹ {totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Nav />
      </div>
    </>
  );
};

export default Cart;
