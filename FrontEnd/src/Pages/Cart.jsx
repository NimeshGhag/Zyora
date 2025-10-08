import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "./../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../features/users/userAction";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);

  const increseQntHandler = (index, product) => {
    const copyuser = { ...user, cart: [...user.cart] };

    copyuser.cart[index] = {
      ...copyuser.cart[index],
      quantity: copyuser.cart[index].quantity + 1,
    };
    console.log(copyuser);
    dispatch(asyncUpdateUser(user.id, copyuser));
  };

  const decreseQntHandler = (index) => {
    const copyuser = { ...user, cart: [...user.cart] };

    if (copyuser.cart[index].quantity == 1) {
      copyuser.cart.splice(index, 1);
    } else {
      copyuser.cart[index] = {
        ...copyuser.cart[index],
        quantity: copyuser.cart[index].quantity - 1,
      };
    }
    dispatch(asyncUpdateUser(user.id, copyuser));
    console.log(copyuser);
  };

  const deleteproduct = (index) => {
    const newCart = user.cart.filter((_,idx)=>idx !==index)
    dispatch(asyncUpdateUser(user.id, {cart:newCart}));
   
  };

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

        {!user?.cart?.length ? (
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
          (user.cart ?? []).map((ci, i) => {
            // Resolve product object:
            // - if ci.product is already an object, use it
            // - otherwise try to find product in products by id (productId or product)
            const productFromItem = ci?.product;

            const product =
              productFromItem && typeof productFromItem === "object"
                ? productFromItem
                : products.find(
                    (p) =>
                      String(p.id) ===
                      String(ci?.productId ?? ci?.product ?? "")
                  );

            // fallback UI when product can't be resolved
            if (!product) {
              return (
                <div
                  className="mb-3 bg-gray-200 rounded p-2 flex justify-between items-center"
                  key={ci?.productId ?? i}
                >
                  <div>Product not found.</div>
                </div>
              );
            }

            return (
              <div
                className="mb-3 bg-gray-200 p-2 flex justify-around items-center rounded-2xl relative"
                key={product.id}
              >
                <img
                  className="h-[10vmax] rounded-2xl"
                  src={product.image ?? ""}
                  alt={product.title ?? ""}
                />
                <div className="flex flex-col p-3 ">
                  <h1>{product.title}</h1>
                  <h2>₹ {product.price}</h2>
                </div>
                <div className="flex items-center justify-around p-2">
                  <button
                    onClick={() => decreseQntHandler(i)}
                    className="text-3xl cursor-pointer"
                  >
                    -
                  </button>
                  <div className="mx-3 w-[2rem] text-center bg-black rounded-full text-amber-300">
                    <h1 className=" text-2xl ">{ci?.quantity ?? 0}</h1>
                  </div>
                  <button
                    onClick={() => increseQntHandler(i)}
                    className="text-3xl cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={()=>deleteproduct(i)}
                  className="w-6 h-6 text-red-700 absolute top-2 right-2 text-center cursor-pointer rounded-full hover:bg-white"
                >
                  <i className="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>
            );
          })
        )}
        <div className="bg-red-500 w-full h-66 fixed bottom-0 right-0 left-0 rounded-t-[4rem] z-10"></div>
        <Nav />
      </div>
    </>
  );
};

export default Cart;
