import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { asyncUpdateProduct } from "../../features/products/productAction";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.product?.products ?? []);

  const product = products?.find((pro) => String(pro.id) === String(id));
  console.log(product);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });

  const updateHnadler = (formData) => {
    // Use the existing product id (from the matched product or the route param)
    const updatedId = product?.id ?? id;
    const updatedProduct = { ...formData, id: updatedId };
    dispatch(asyncUpdateProduct(updatedId, updatedProduct));
    reset();
    navigate("/products");
  };

  return (
    <div className="w-screen h-screen flex flex-col ">
      <form
        onSubmit={handleSubmit(updateHnadler)}
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

export default UpdateProduct;
