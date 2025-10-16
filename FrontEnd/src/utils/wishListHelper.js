export const addToWishList = (wishlist = [], id) => {
  const copyWish = Array.isArray(wishlist) ? [...wishlist] : [];
  const x = copyWish.findIndex((c) => String(c.productId) === String(id));
  if (x === -1) {
    copyWish.push({ productId: id });
  } else {
    // if already in wishlist, remove it (toggle behavior)
    copyWish.splice(x, 1);
  }
  return copyWish;
};

export const deleteWishHandler = (wishlist = [], index) => {
  const copy = (wishlist || []).map((w) => ({ ...w }));
  if (index < 0 || index >= copy.length) return copy;
  const newWish = copy.filter((_, idx) => idx !== index);
  return newWish;
};
