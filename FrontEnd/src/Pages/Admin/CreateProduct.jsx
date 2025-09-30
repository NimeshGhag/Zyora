import { nanoid } from "nanoid/non-secure";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncCreateProduct } from "../../features/products/productAction";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const createhandler = (product) => {
    product.id = nanoid();
    dispatch(asyncCreateProduct(product))
    reset();
    navigate("/products");
  };

  

  return (
    <div className="w-screen h-screen flex flex-col ">
      <form
        onSubmit={handleSubmit(createhandler)}
        className="p-5 flex flex-col gap-4 "
      >
        <input
          {...register("image")}
          className="w-full text-xl  p-2 border-1 border-gray-300 outline-0 rounded-lg"
          type="url"
          placeholder="Product Image URL"
        />

        <input
          {...register("title")}
           maxLength={15}
          className="w-full text-xl  p-2 border-1 border-gray-300 outline-0 rounded-lg"
          type="text"
          placeholder="Product Title"
        />
        <input
          {...register("price")}
          className="w-full text-xl  p-2 border-1 border-gray-300 outline-0 rounded-lg"
          type="text"
          placeholder="0.00"
        />
        <input
          {...register("category")}
          className="w-full text-xl  p-2 border-1 border-gray-300 outline-0 rounded-lg"
          type="text"
          placeholder="Product Category"
        />
        <textarea
          {...register("description")}
          className="w-full text-xl  p-2 border-1 border-gray-300 outline-0 rounded-lg"
          type="text"
          placeholder="Product Description Here..."
        ></textarea>
        <button className="text-white rounded-xl  text-xl px-5 py-3 bg-black cursor-pointer hover:text-amber-300 hover:transition duration-300 ease-in-out">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
