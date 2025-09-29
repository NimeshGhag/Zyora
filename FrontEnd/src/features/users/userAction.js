import axios from "../../Api/axiosconfig";
import { loaduser, logOutUser } from "./userSlice";

//Register User
export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/users", user);
    console.log(data);
  } catch (error) {
    console.log("error", error);
  }
};

//Login user
export const asyncLoginrUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    console.log(data);
    if (data && data.length > 0) {
      localStorage.setItem("token", JSON.stringify(data[0]));
      dispatch(loaduser(data[0]));
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    console.log("error", error);
  }
};

//LogOut User
export const asyncLogOutUser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("token");
    dispatch(logOutUser());
    console.log('user log out');
    
  } catch (error) {
    console.log("error", error);
  }
};

//Current User
export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }
    
    const user = JSON.parse(token);
    if (user && user.email) {
      dispatch(loaduser(user));
    } else {
      console.log("Invalid user data in token");
    }
  } catch (error) {
    console.log("error", error);
  }
};
