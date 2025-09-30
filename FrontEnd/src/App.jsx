import React, { useEffect } from "react";
import MainRoutes from "./routing/MainRoutes";
// import Nav from "./Components/Nav";
import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "./features/users/userAction";
import { asyncLoadProduct } from "./features/products/productAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncLoadProduct());
  }, []);
  return (
    <div className="relative h-screen w-screen bg-white text-black ">
      {/* <Nav /> */}
      <MainRoutes />
    </div>
  );
};

export default App;
