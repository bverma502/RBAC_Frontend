import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import permissionReducer from "./slices/permissionSlice";
import menuReducer from "./slices/menuSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  role: roleReducer,
  permission: permissionReducer,
  menu: menuReducer,
});

export default rootReducer;
