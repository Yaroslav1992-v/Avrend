import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat";
import commentsLikeReducer from "./commentLike";
import commentsReducer from "./comments";
import messagesReducer from "./messages";
import notificationReducer from "./notification";
import postReducer from "./post";
import postsLikeReducer from "./postLike";
import userReducer from "./user";
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  comments: commentsReducer,
  commentLikes: commentsLikeReducer,
  postLikes: postsLikeReducer,
  chat: chatReducer,
  messages: messagesReducer,
  notification: notificationReducer,
});
export default function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
