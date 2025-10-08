import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./../Components/Nav";
import { asyncDeleteProduct } from "../features/products/productAction";
import { asyncUpdateUser } from "../features/users/userAction";

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
    const copyuser = { ...user, cart: [...user.cart] };
    const x = copyuser.cart.findIndex((c) => c.productId == id);
    if (x == -1) {
      copyuser.cart.push({ productId: id, quantity: 1 });
    } else {
      copyuser.cart[x] = {
        productId: id,
        quantity: copyuser.cart[x].quantity + 1,
      };
    }
    navigate("/cart");
    dispatch(asyncUpdateUser(copyuser.id, copyuser));
  };

  return (
    <div className=" flex flex-col gap-2 relative tracking-tight ">
      <div className="flex justify-between items-center p-3">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>

        <h1 onClick={() => navigate(-1)} className="text-xl cursor-pointer">
          Product
        </h1>

        <button
          onClick={() => navigate("/cart")}
          className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-emerald-700 hover:transition duration-300 ease-in-out"
        >
          <i className="ri-shopping-cart-line text-xl"></i>
        </button>
      </div>

      <div key={product?.id} className=" relative flex flex-col gap-5 ">
        <div className="h-[50vh] rounded-bl-[5rem]  shadow-xl  ">
          <img
            className="w-[90%] h-[90%] object-contain rounded-bl-[5rem]"
            src={product?.image}
            alt=""
          />
        </div>

        <div className=" p-3 flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl">{product?.title}</h1>
            <h1 className="text-2xl font-bold">₹ {product?.price}</h1>
          </div>

          <div className="flex flex-col gap-1 ">
            <h1 className="text-md font-semibold text-emerald-700">
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
                className="bg-black text-white py-4 pl-3 w-[45%] fixed right-0 bottom-0 grid place-items-center rounded-tl-[3rem] cursor-pointer text-lg hover:text-amber-300 hover:transition duration-300 ease-in-out"
              >
                Update Product
              </button>

              <button
                onClick={deleteHandler}
                className="bg-black text-white py-4 pr-3 w-[45%] fixed left-0 bottom-0 grid place-items-center rounded-tr-[3rem] cursor-pointer text-lg  hover:text-red-500 hover:transition duration-300 ease-in-out"
              >
                Delete Product
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCartHandler(product?.id)}
              className="bg-black text-white py-5 pl-3 w-[50%] fixed right-0 bottom-0 grid place-items-center rounded-tl-[3rem] cursor-pointer text-xl hover:text-amber-300 hover:transition duration-300 ease-in-out"
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
