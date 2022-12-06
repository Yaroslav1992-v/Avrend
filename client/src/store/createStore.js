import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./post";
import userReducer from "./user";
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
});
export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
