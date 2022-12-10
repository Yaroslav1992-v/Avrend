import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsLikeReducer from "./commentLike";
import commentsReducer from "./comments";
import postReducer from "./post";
import postsLikeReducer from "./postLike";
import userReducer from "./user";
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  comments: commentsReducer,
  commentLikes: commentsLikeReducer,
  postLikes: postsLikeReducer,
});
export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
