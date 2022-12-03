import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
const rootReducer = combineReducers({
  users: userReducer,
});
export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
