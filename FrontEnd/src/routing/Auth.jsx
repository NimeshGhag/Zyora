import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = (props) => {
  const  user  = useSelector((state) => state.user && state.user.user);
  return user? props.children:<Navigate to={"/logIn"}/>;
};

export default Auth;
