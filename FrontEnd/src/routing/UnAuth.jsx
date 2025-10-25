import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UnAuth = (props) => {
  const user = useSelector((state) => state.user && state.user.user);
  return !user ? props.children : <Navigate to={"/"} />;
};

export default UnAuth;
