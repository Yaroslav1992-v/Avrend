import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
const initialState = localStorageService.getAccessToken()
  ? {
      entities: [],
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      currentUser: {},
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: [],
      isLoading: false,
      error: null,
      auth: null,
      currentUser: {},
      isLoggedIn: false,
      dataLoaded: false,
    };
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.currentUser = state.entities.find(
        (user) => user._id === state.auth.userId
      );
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdated: (state, action) => {
      const index = state.entities.findIndex(
        (user) => user._id === action.payload._id
      );
      state.entities[index] = action.payload;
    },
  },
});
export const signUp = (payload) => async (dispatch) => {
  try {
    const { data } = await authService.register(payload);
    localStorageService.setTokens({ ...data, userId: data.userId });
    dispatch(authRequestSuccess({ userId: data.userId }));
    dispatch(userCreated(data.newUser));
    return true;
  } catch (error) {
    const { message } = error.response.data.error;
    dispatch(authRequestFailed(message));
  }
};
export const signIn = (payload) => async (dispatch) => {
  try {
    const data = await authService.login(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    return true;
  } catch (error) {
    const { message } = error.response.data.error;
    dispatch(authRequestFailed(message));
  }
};
export const updateUser = (payload, id) => async (dispatch) => {
  try {
    const data = await userService.updateUser(payload, id);
    dispatch(userUpdated(data));
    return true;
  } catch (error) {
    const { message } = error.response.data.error;
    dispatch(authRequestFailed(message));
  }
};
export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await userService.getUsers();
    dispatch(usersReceived(data));
  } catch (error) {
    dispatch(usersRequestFailed());
  }
};
const { reducer: userReducer, actions } = userSlice;
export const findUserByAccountName = (accountName) => (state) =>
  state.users.entities.find((user) => user.accountName === accountName);
export const findUserById = (id) => (state) =>
  state.users.entities.find((user) => user._id === id);
export const getAuthError = () => (state) => state.users.error;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUser = () => (state) => state.users.currentUser;
export const getUsersLoadingStatus = () => (state) => state.users.dataLoaded;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
const {
  authRequestSuccess,
  authRequestFailed,
  usersRequested,
  usersReceived,
  userUpdated,
  usersRequestFailed,
  userCreated,
} = actions;

export default userReducer;
