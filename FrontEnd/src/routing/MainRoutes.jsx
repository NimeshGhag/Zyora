import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Auth from "./Auth";
import UnAuth from "./UnAuth";
import AdminAuth from "./AdminAuth";

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
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route
        path="/logIn"
        element={
          <UnAuth>
            <Login />
          </UnAuth>
        }
      />
      <Route
        path="/register"
        element={
          <UnAuth>
            <Register />
          </UnAuth>
        }
      />

      <Route
        path="/cart"
        element={
          <Auth>
            <Cart />
          </Auth>
        }
      />
      <Route
        path="/wishlist"
        element={
          <Auth>
            <WishList />
          </Auth>
        }
      />
      <Route
        path="/account"
        element={
          <Auth>
            <Account />
          </Auth>
        }
      />
      <Route
        path="/update-user/:id"
        element={
          <Auth>
            <UpdateUser />
          </Auth>
        }
      />

      <Route
        path="/update-product/:id"
        element={
          <AdminAuth>
            <UpdateProduct />
          </AdminAuth>
        }
      />
      <Route
        path="/create-product"
        element={
          <AdminAuth>
            <CreateProduct />
          </AdminAuth>
        }
      />
      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRoutes;
