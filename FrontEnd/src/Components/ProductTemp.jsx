import { Link } from "react-router-dom";

const ProductTemp = ({ product }) => {
  return (
    <div
      key={product.id}
      className="flex flex-col items-start m-auto w-40 h-54  rounded-2xl shadow-lg bg-white hover:scale-105 hover:transition duration-300 ease-in-out md:w-55 md:h-69 lg:w-60 lg:h-74"
    >
      <Link
        to={`/products/${product.id}`}
        className="w-full block overflow-hidden rounded-lg mb-3"
      >
        <img
          className="w-full h-full object-contain p-2"
          src={product.image}
          alt={product.title}
        />
      </Link>

      <div className="mt-auto w-full px-2 mb-2">
        <h3 className="text-sm md:text-base font-medium line-clamp-2">{product.title}</h3>
        <span className="text-lg md:text-xl  font-semibold">₹ {product.price}</span>
      </div>

      <Link
        to={`/products/${product.id}`}
        className="text-sm md:text-base lg:text-lg text-white bg-black w-full rounded-b-2xl text-center p-2 hover:text-amber-300"
      >
        View
      </Link>
    </div>
  );
};

export default ProductTemp;
