import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminAuth = (props) => {
  const user = useSelector((state) => state.user && state.user.user);

  if (!user) return <Navigate to={"/logIn"} />;

  if (!user.isAdmin) return <Navigate to={"/"} />;

  return props.children;
};

export default AdminAuth;
