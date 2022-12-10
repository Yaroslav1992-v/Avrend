import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentCreated: (state, action) => {
      console.log(action);
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    commentUpdated: (state, action) => {
      const index = state.entities.findIndex(
        (comment) => comment._id === action.payload._id
      );
      state.entities[index] = action.payload;
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(
        (post) => post._id !== action.payload
      );
    },
  },
});
const commentCreateRequested = createAction("comment/CreateRequest");
const commentRemoveRequested = createAction("comment/RemoveRequest");
export const createComment = (comment) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const data = await commentService.postComment(comment);

    dispatch(commentCreated(data));
    return true;
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};
export const removeComment = (commentId, postId) => async (dispatch) => {
  commentRemoveRequested();
  try {
    const data = await commentService.removeComment(commentId, postId);
    dispatch(commentDeleted(commentId));
    return data;
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};
export const updateComment = (comment) => async (dispatch) => {
  dispatch(commentCreateRequested());
  try {
    const data = await commentService.updateComment(comment, comment._id);
    dispatch(commentUpdated(data));

    return true;
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};
export const createCommentReply =
  (newComment, { comment }) =>
  async (dispatch) => {
    dispatch(commentCreateRequested());
    try {
      const content = await commentService.postComment(newComment);
      dispatch(commentCreated(content));

      const parentComment = {
        ...comment,
        replies: [...comment.replies, content._id],
      };
      const data = await commentService.updateComment(
        parentComment,
        parentComment._id
      );
      dispatch(commentUpdated(data));

      return true;
    } catch (error) {
      dispatch(commentsRequestFailed(error.message));
    }
  };
export const loadComments = () => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const content = await commentService.getComments();
    dispatch(commentsReceived(content));
  } catch (error) {
    console.log(error.message);
    dispatch(commentsRequestFailed(error.message));
  }
};
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.dataLoaded;
export const getCommentsByPostId = (id) => (state) => {
  return state.comments.entities.filter((comment) => comment.postId === id);
};

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentUpdated,
  commentDeleted,
} = actions;
export default commentsReducer;
