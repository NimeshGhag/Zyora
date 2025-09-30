import axios from "../../Api/axiosconfig";

import { loadProduct } from "./productslice";

export const asyncLoadProduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadProduct(data));
    console.log("product loded");
  } catch (error) {}
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/products", product);
    dispatch(asyncLoadProduct(data));
    console.log("product created");
  } catch (error) {}
};

export const asyncUpdateProduct = (id , product) => async (dispatch, getState) => {
  try {
     await axios.patch(`/products/${id}`,product);
    dispatch(asyncLoadProduct());
    console.log("product updated");
  } catch (error) {}
};

export const asyncDeleteProduct = (id) => async (dispatch, getState) => {
  try {
     await axios.delete(`/products/${id}`);
    dispatch(asyncLoadProduct());
    console.log("product deleted");
  } catch (error) {}
};