import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productslice";

// Try to read the saved user from localStorage synchronously so
// the app starts with the stored user (avoids a brief null state).
const getPreloadedUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { user: null };
    const user = JSON.parse(token);
    return { user: user || null };
  } catch (e) {
    return { user: null };
  }
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    product : productReducer,
  },
  preloadedState: {
    user: getPreloadedUser(),
  },
});
