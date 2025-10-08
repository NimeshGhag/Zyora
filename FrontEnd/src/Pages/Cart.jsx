import { useParams } from "react-router-dom";
import Nav from "./../Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { asyncUpdateUser } from "../features/users/userAction";

const Cart = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="p-5">
      {/* safe cart array (avoid crash if user or user.cart is undefined) */}

      {!user?.cart?.length ? (
        <div className="text-center p-6">Your cart is empty.</div>
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
                    String(p.id) === String(ci?.productId ?? ci?.product ?? "")
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
              className="mb-3 bg-gray-200 rounded p-2 flex justify-between items-center"
              key={product.id}
            >
              <img
                className="h-[10vmax]"
                src={product.image ?? ""}
                alt={product.title ?? ""}
              />
              <h1>{product.title}</h1>
              <h2>{product.price}</h2>
              <div>
                <button
                  onClick={() => decreseQntHandler(i)}
                  className="text-2xl"
                >
                  -
                </button>
                <span className="mx-3">{ci?.quantity ?? 0}</span>
                <button
                  onClick={() => increseQntHandler(i)}
                  className="text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          );
        })
      )}

      <Nav />
    </div>
  );
};

export default Cart;
