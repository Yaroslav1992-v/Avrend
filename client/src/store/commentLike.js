import { createAction, createSlice } from "@reduxjs/toolkit";
import likeService from "../services/like.service";
import { updateComment } from "./comments";
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const commentLikeSlice = createSlice({
  name: "commentLikes",
  initialState,
  reducers: {
    commentlikesRequested: (state) => {
      state.isLoading = true;
    },
    commentLikesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    commentLikesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentLiked: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },

    likeFromCommentRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
});
const likeCommentRequested = createAction("comment/LikeRequest");
const likeRemoveRequested = createAction("comment/LikeRemove");
export const likeComment = (like, comment) => async (dispatch) => {
  dispatch(likeCommentRequested());
  try {
    const content = await likeService.likeComment(like);
    const likes = [...comment.likes, content._id];
    await dispatch(updateComment({ ...comment, likes: likes }));
    dispatch(commentLiked(content));
    return content;
  } catch (error) {
    dispatch(commentLikesRequestFailed(error.message));
  }
};
export const removeLikeFromComment = (id, comment) => async (dispatch) => {
  dispatch(likeRemoveRequested());
  try {
    const content = await likeService.removeLikeFromComment(id);
    await dispatch(updateComment(comment));
    dispatch(likeFromCommentRemoved(content));
    return true;
  } catch (error) {
    dispatch(commentLikesRequestFailed(error.message));
  }
};
export const loadCommentLikes = () => async (dispatch) => {
  dispatch(commentlikesRequested());
  try {
    const content = await likeService.getCommentLikes();
    dispatch(commentLikesReceived(content));
  } catch (error) {
    dispatch(commentLikesRequestFailed(error.message));
  }
};
export const getCommentLikesLoadingStatus = () => (state) =>
  state.commentLikes.dataLoaded;
export const getLikesById = (id) => (state) =>
  state.commentLikes.entities.filter((like) => like.commentId === id);
const { reducer: commentsLikeReducer, actions } = commentLikeSlice;
const {
  commentLiked,
  commentLikesRequestFailed,
  commentlikesRequested,
  commentLikesReceived,
  likeFromCommentRemoved,
} = actions;
export default commentsLikeReducer;
