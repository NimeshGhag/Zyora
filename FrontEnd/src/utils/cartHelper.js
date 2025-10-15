export const increseQnty = (cart = [], index) => {
  const copy = (cart || []).map((c) => ({ ...c }));
  if (index < 0 || index >= copy.length) return copy;
  const qty = Number(copy[index].quantity) || 0;
  copy[index] = { ...copy[index], quantity: qty + 1 };
  return copy;
};

export const decerseQnty = (cart = [], index) => {
  const copy = (cart || []).map((c) => ({ ...c }));
  if (index < 0 || index >= copy.length) {
    return copy;
  }
  const qnty = Number(copy[index].quantity) || 0;
  if (qnty == 1) {
    copy.splice(index, 1);
    return copy;
  } else {
    copy[index] = { ...copy[index], quantity: qnty - 1 };
  }
  return copy;
};

export const deleteProductHandler = (cart = [], index) => {
  const copy = (cart || []).map((c) => ({ ...c }));
  if (index < 0 || index >= copy.length) return copy;
  const newCart = copy.filter((_, idx) => idx !== index);
  return newCart;
};

export const resolveProduct = (cartItems, products = []) => {
  const productFromItem = cartItems?.product;

  if (productFromItem && typeof productFromItem === "object")
    return productFromItem;
  const idToFind = String(cartItems?.productId ?? cartItems?.product ?? "");

  const foundProduct = products.find((p) => String(p.id) === idToFind);
  return foundProduct ?? null;
};

export const calculateCartDataHelper = (user, products) => {
  if (!user?.cart?.length || !products?.length)
    return { cartItems: [], totalPrice: 0 };

  const items = (user.cart ?? [])
    .map((ci, idx) => {
      const product = resolveProduct(ci, products);
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
    if (subTotal > 30000) return 100;
    if (subTotal <= 1000) return 50;
    else if (subTotal <= 50000) return 80;
    else return 100;
  })();

  const total = subTotal + shippingTotal;
  return { cartItems: items, totalPrice: total, shipping: shippingTotal };
};
