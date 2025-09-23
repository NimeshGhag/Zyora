import React from "react";
import MainRoutes from "./routing/MainRoutes";
import Nav from './Components/NAv';

const App = () => {
  return (
    <div className="relative h-screen w-screen bg-white text-black ">
      <Nav />
      <MainRoutes />
    </div>
  );
};

export default App;
