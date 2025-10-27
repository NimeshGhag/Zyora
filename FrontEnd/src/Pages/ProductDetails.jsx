import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./../Components/Nav";
import { asyncDeleteProduct } from "../features/products/productAction";
import { asyncUpdateUser } from "../features/users/userAction";
import { addToCartHelper } from "../utils/cartHelper";
import { addToWishList } from "../utils/wishListHelper";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);

  // route param `id` is a string; ensure comparison works with numeric ids too
  const product = products?.find((pro) => String(pro.id) === String(id));

  const deleteHandler = () => {
    dispatch(asyncDeleteProduct(id));
    navigate("/products");
  };

  const addToCartHandler = (id) => {
    if (!user) {
      navigate("/logIn");
    }
    const newCart = addToCartHelper(user.cart, id);
    dispatch(asyncUpdateUser(user.id, { ...user, cart: newCart }));
    navigate("/cart");
  };

  const addToWishlist = (id) => {
    if (!user) {
      navigate("/logIn");
      return;
    }
    const newWish = addToWishList(user.wishlist, id);
    dispatch(asyncUpdateUser(user.id, { ...user, wishlist: newWish }));
  };
  
  return (
    <div className=" flex flex-col gap-2 relative tracking-tight ">
      <div className="flex justify-between items-center p-3 lg:p-4">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-arrow-left-line text-2xl lg:text-3xl"></i>
        </button>

        <h1 onClick={() => navigate(-1)} className="text-xl lg:text-2xl cursor-pointer">
          Product
        </h1>

        <button
          onClick={() => navigate("/cart")}
          className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-shopping-cart-line text-2xl lg:text-3xl"></i>
        </button>
      </div>

      <div key={product?.id} className=" relative flex flex-col gap-5 ">
        <div className="h-[50vh] md:h-[60vh] rounded-bl-[5rem]  shadow-xl relative ">
          <img
            className="w-[90%] h-[90%] m-auto object-contain rounded-bl-[5rem]"
            src={product?.image}
            alt=""
          />
          <button
            onClick={() => addToWishlist(product?.id)}
            className="absolute bottom--10 right-10 text-5xl bg-black rounded-full p-3 border cursor-pointer md:bottom-[-35px]"
          >
            <i
              className={
                "ri-heart-2-fill " +
                (user &&
                Array.isArray(user.wishlist) &&
                user.wishlist.findIndex(
                  (w) => String(w.productId) === String(product?.id)
                ) !== -1
                  ? "text-red-400"
                  : "text-white")
              }
            ></i>
          </button>
        </div>

        <div className=" p-3 flex flex-col gap-3 md:p-5 lg:mb-20">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl">{product?.title}</h1>
            <h1 className="text-2xl md:text-3xl font-bold">₹ {product?.price}</h1>
          </div>

          <div className="flex flex-col gap-1 ">
            <h1 className="text-md md:text-lg font-semibold text-emerald-700">
              Description
            </h1>
            <p className="opacity-70">{product?.description}</p>
          </div>
        </div>

        <div>
          {user && user.isAdmin ? (
            <div className="flex items-center">
              <button
                onClick={() => navigate(`/update-product/${product?.id}`)}
                className="bg-black text-white py-4 pl-3 w-[45%] fixed right-0 bottom-0 grid place-items-center rounded-tl-[3rem] cursor-pointer text-lg md:text-2xl lg:text-3xl hover:text-amber-300 hover:transition duration-300 ease-in-out"
              >
                Update Product
              </button>

              <button
                onClick={deleteHandler}
                className="bg-black text-white py-4 pr-3 w-[45%] fixed left-0 bottom-0 grid place-items-center rounded-tr-[3rem] cursor-pointer text-lg md:text-2xl lg:text-3xl hover:text-red-500 hover:transition duration-300 ease-in-out"
              >
                Delete Product
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCartHandler(product?.id)}
              className="bg-black text-white py-5 pl-3 w-[50%] fixed right-0 bottom-0 grid place-items-center rounded-tl-[3rem] cursor-pointer text-xl md:text-2xl
              lg:text-3xl hover:text-amber-300 hover:transition duration-300 ease-in-out"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
