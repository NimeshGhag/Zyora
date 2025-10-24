import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const PageNotFound = lazy(() => import("../Pages/PageNotFound"));
const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("./../Pages/Login"));
const Products = lazy(() => import("./../Pages/Products"));
const Register = lazy(() => import("./../Pages/Register"));
const Cart = lazy(() => import("../Pages/Cart"));
const Account = lazy(() => import("../Pages/Account"));
const CreateProduct = lazy(() => import("../Pages/Admin/CreateProduct"));
const ProductDetails = lazy(() => import("./../Pages/ProductDetails"));
const UpdateProduct = lazy(() => import("../Pages/Admin/UpdateProduct"));
const UpdateUser = lazy(() => import("../Pages/Users/UpdateUser"));
const WishList = lazy(() => import("../Pages/WishList"));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logIn" element={<Login />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<WishList />} />
      <Route path="/account" element={<Account />} />
      <Route path="/update-user/:id" element={<UpdateUser />} />
      <Route path="/create-product" element={<CreateProduct />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
