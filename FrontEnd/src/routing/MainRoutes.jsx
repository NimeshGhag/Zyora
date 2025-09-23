import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Login from './../Pages/Login';
import Products from './../Pages/Products';
import Register from './../Pages/Register';
import Cart from "../Pages/Cart";
import Account from "../Pages/Account";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/logIn" element ={<Login/>}/>
      <Route path="/products" element ={<Products/>}/>
      <Route path="/register" element ={<Register/>}/>
      <Route path="/cart" element ={<Cart/>}/>
      <Route path="/account" element ={<Account/>}/>

    </Routes>
  );
};

export default MainRoutes;
