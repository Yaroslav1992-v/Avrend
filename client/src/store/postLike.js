import { createAction, createSlice } from "@reduxjs/toolkit";
import likeService from "../services/like.service";
import { updatePost } from "./post";
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const postLikeSlice = createSlice({
  name: "postLikes",
  initialState,
  reducers: {
    postLikesRequested: (state) => {
      state.isLoading = true;
    },
    postLikesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    postLikeRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postLiked: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },

    likeFromPostRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (like) => like._id !== action.payload
      );
    },
  },
});
const likePostRequested = createAction("comment/LikeRequest");
const likeRemoveRequested = createAction("comment/LikeRemove");
export const likePost = (like, post) => async (dispatch) => {
  dispatch(likePostRequested());
  try {
    const content = await likeService.likePost(like);
    const likes = [...post.likes, post._id];
    dispatch(updatePost({ ...post, likes: likes }));
    dispatch(postLiked(content));
    return content;
  } catch (error) {
    dispatch(postLikeRequestFailed(error.message));
  }
};
export const removeLikeFromPost = (id) => async (dispatch) => {
  dispatch(likeRemoveRequested());
  try {
    await likeService.removeLikeFromPost(id);
    dispatch(likeFromPostRemoved(id));
    return true;
  } catch (error) {
    dispatch(postLikeRequestFailed(error.message));
  }
};
export const loadPostLikes = () => async (dispatch) => {
  dispatch(postLikesRequested());
  try {
    const content = await likeService.getPostLikes();
    dispatch(postLikesReceived(content));
  } catch (error) {
    dispatch(postLikeRequestFailed(error.message));
  }
};
export const getPostLikesLoadingStatus = () => (state) =>
  state.postLikes.dataLoaded;
export const getLikes = () => (state) => state.postLikes.entities;
export const getLikesById = (id) => (state) =>
  state.commentLikes.entities.filter((like) => like.commentId === id);
const { reducer: postsLikeReducer, actions } = postLikeSlice;
const {
  postLiked,
  postLikeRequestFailed,
  postLikesRequested,
  postLikesReceived,
  likeFromPostRemoved,
} = actions;
export default postsLikeReducer;
