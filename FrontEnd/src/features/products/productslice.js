import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProduct: (state, action) => {
      state.products = action.payload;
    },

    lazyLoadProduct: (state, action) => {
      // merge existing and incoming products and remove duplicates by id
      const merged = [...state.products, ...action.payload];
      const uniqueById = Array.from(
        new Map(merged.map((p) => [String(p.id), p])).values()
      );
      state.products = uniqueById;
    },
  },
});

export default productsSlice.reducer;
export const { lazyLoadProduct, loadProduct } = productsSlice.actions;
