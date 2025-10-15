import { useNavigate } from "react-router-dom";
import Nav from "./../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../features/users/userAction";
import { useMemo } from "react";
import { decerseQnty, increseQnty } from "../utils/cartHelper";

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
    console.log(newCart);
  };

  const deleteproduct = (index) => {
    const newCart = user.cart.filter((_, idx) => idx !== index);
    dispatch(asyncUpdateUser(user.id, { cart: newCart }));
  };

  const resolveProduct = (ci) => {
    const productFromItem = ci?.product;
    if (productFromItem && typeof productFromItem === "object")
      return productFromItem;
    const idToFind = String(ci?.productId ?? ci?.product ?? "");
    return products.find((p) => String(p.id) === idToFind) ?? null;
  };

  // memoized normalized cart items and total price
  const { cartItems, totalPrice, shipping } = useMemo(() => {
    if (!user?.cart?.length || !products?.length)
      return { cartItems: [], totalPrice: 0 };

    const items = (user.cart ?? [])
      .map((ci, idx) => {
        const product = resolveProduct(ci);
        const quantity = Number(ci?.quantity ?? 0);
        return product ? { product, quantity, cartIndex: idx } : null;
      })
      .filter(Boolean);

    const subTotal = items.reduce((sum, it) => {
      const rawPrice = it.product?.price ?? 0;
      const priceNum = Number(String(rawPrice).replace(/[^0-9.-]+/g, "")) || 0;

      const qty = Number(it.quantity) || 0;
      return sum + priceNum * qty;
    }, 0);

    const shippingTotal = (() => {
      if (subTotal > 30000) {
        return 100;
      }

      return items.reduce((s, it) => {
        const rawPrice = it.product?.price ?? 0;
        const priceNum =
          Number(String(rawPrice).replace(/[^0-9.-]+/g, "")) || 0;
        const qty = Number(it.quantity) || 0;

        let fee;
        if (priceNum <= 1000) fee = 50;
        else if (priceNum <= 50000) fee = 80;
        else fee = 100;

        // charge shipping per unit (change to just fee if per-line desired)
        return s + fee * qty;
      }, 0);
    })();

    const total = subTotal + shippingTotal;
    return { cartItems: items, totalPrice: total, shipping: shippingTotal };
  }, [user?.cart, products]);

  return (
    <>
      <div className="flex justify-between items-center px-1 py-2 mb-5 fixed top-0 right-0 left-0 z-60 bg-white/30 backdrop-blur-xs ">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>

        <h1 className="text-xl cursor-pointer">Cart</h1>

        <button
          onClick={() => navigate("/cart")}
          className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-red-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-heart-2-line text-2xl"></i>
        </button>
      </div>

      <div className="p-5 min-h-screen pb-66 relative mt-8">
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
                className="mb-3 bg-gray-200 p-2 flex justify-around items-center rounded-2xl relative"
              >
                <img
                  className="h-[10vmax] w-[10vmax] rounded-2xl object-cover"
                  src={product.image ?? ""}
                  alt={product.title ?? ""}
                />

                <div className="flex flex-col p-3 w-3xs ">
                  <h1>{product.title}</h1>
                  <h2>₹ {product.price}</h2>
                </div>

                <div className="flex items-center justify-around p-2 w-[10rem]">
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
            <div className="bg-amber-300  w-full h-70 rounded-t-[4rem]">
              <div className=" bg-amber-100 p-3 m-3 absolute top-10 left-0 right-0 flex  flex-col items-start rounded-2xl">
                <div className=" flex justify-between items-center w-full ">
                  <h2 className="text-lg">Selected Items</h2>
                  <p className="text-sm opacity-80">
                    {cartItems.length} item(s)
                  </p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-lg">Shipping Fee</h2>
                  <p>₹{shipping}</p>
                </div>
                <div className="h-[1px] w-full bg-black my-3"></div>
                <div className="flex justify-between items-center w-full">
                  <h1 className="text-xl">Total</h1>

                  <p className="text-2xl">₹ {totalPrice.toFixed(2)}</p>
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
