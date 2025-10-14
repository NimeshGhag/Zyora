import React, { useEffect } from "react";
import MainRoutes from "./routing/MainRoutes";
// import Nav from "./Components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser } from "./features/users/userAction";


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user && state.user.user);
  const products = useSelector((state) => state.product?.products ?? []);

  useEffect(() => {
    !user && dispatch(asyncCurrentUser());
  }, [user]);

  return (
    <div className="relative h-screen w-screen bg-white text-black ">
      {/* <Nav /> */}
      <MainRoutes />
    </div>
  );
};

export default App;
