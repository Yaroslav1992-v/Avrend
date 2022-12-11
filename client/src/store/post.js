import { createAction, createSlice } from "@reduxjs/toolkit";
import postService from "../services/post.service";
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsRequested: (state) => {
      state.isLoading = true;
    },
    postsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    postsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    postCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    postUpdated: (state, action) => {
      const index = state.entities.findIndex(
        (post) => post._id === action.payload._id
      );
      state.entities[index] = action.payload;
    },
    postDeleted: (state, action) => {
      state.entities = state.entities.filter(
        (post) => post._id !== action.payload._id
      );
    },
  },
});
const postCreateRequested = createAction("post/CreateRequest");
export const createPost = (post) => async (dispatch) => {
  dispatch(postCreateRequested());
  try {
    const content = await postService.createPost(post);
    dispatch(postCreated(content));
    return true;
  } catch (error) {
    dispatch(postsRequestFailed());
  }
};
export const updatePost = (post) => async (dispatch) => {
  try {
    const data = await postService.updatePost(post, post._id);
    dispatch(postUpdated(data));
    return true;
  } catch (error) {}
};
export const loadPosts = () => async (dispatch) => {
  dispatch(postsRequested());
  try {
    const content = await postService.getPosts();
    dispatch(postsReceived(content));
  } catch (error) {
    dispatch(postsRequestFailed());
  }
};
export const getPostLoadingStatus = () => (state) => state.posts.dataLoaded;
export const getPostsByUserId = (array) => (state) => {
  let posts = [];
  array.forEach((item) => {
    posts = [
      ...posts,
      ...state.posts.entities.filter((post) => post.userId === item),
    ];
  });
  return posts;
};
export const getPostsById = (id) => (state) =>
  state.posts.entities.filter((post) => post.userId === id);
const { reducer: postReducer, actions } = postSlice;
const {
  postsRequested,
  postsReceived,
  postUpdated,
  postsRequestFailed,
  postCreated,
  postDeleted,
} = actions;
export default postReducer;
