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
