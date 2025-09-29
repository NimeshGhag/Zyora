import React, { useEffect } from "react";
import MainRoutes from "./routing/MainRoutes";
import Nav from "./Components/Nav";
import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "./features/users/userAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, []);
  return (
    <div className="relative h-screen w-screen bg-white text-black ">
      <Nav />
      <MainRoutes />
    </div>
  );
};

export default App;
