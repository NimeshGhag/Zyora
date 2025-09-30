import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from './../Components/Nav';

const ProductDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);
  const product = products?.find((pro) => pro.id === id);
  console.log(product);
    const backHandler =()=>{
        navigate(-1)
    }

       const cartHandler =()=>{
        navigate("/cart")
    }
  return (
    <div className=" flex flex-col gap-2 relative tracking-tight ">
      <div className="flex justify-between items-center p-3">
        <button onClick={backHandler} className="cursor-pointer  hover:text-emerald-700 hover:transition duration-300 ease-in-out">
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>
        <h1 onClick={backHandler} className="text-xl cursor-pointer">Product</h1>
        <button onClick={cartHandler} className="w-[2rem] grid place-items-center h-[2rem] rounded-full cursor-pointer hover:text-emerald-700 hover:transition duration-300 ease-in-out">
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
          <button onClick={cartHandler} className="bg-black text-white py-5 pl-3 w-[50%] fixed right-0 bottom-0 grid place-items-center rounded-tl-[3rem] cursor-pointer text-xl hover:text-amber-300 hover:transition duration-300 ease-in-out ">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
     

  );
};

export default ProductDetails;

{
  /* <div key={product?.id} className="w-full  shadow-lg  mr-5 mb-5 p-5">
        <img className="h-[40vh] block mx-auto" src={product?.image} alt="" />
        <h1 className="text-4xl">{product?.title}</h1>
        <p className="mt-5">{product?.description}</p>
        <p className="my-5 text-red-400 text-5xl">{product?.price}</p>
        <div className="flex justify-between items-center p-3">
          <button className="text-yellow-400">Add to cart</button>
        </div>
      </div> */
}
