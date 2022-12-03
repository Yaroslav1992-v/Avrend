import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
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
  },
});
export const signUp = (payload) => async (dispatch) => {
  try {
    const data = await authService.register(payload);

    localStorageService.setTokens({ ...data, userId: data.newUser._id });
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
    localStorageService.setTokens({ ...data, userId: data.newUser._id });
    dispatch(authRequestSuccess({ userId: data.userId }));
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
export const getAuthError = () => (state) => state.users.error;
export const getUsersLoadingStatus = () => (state) => state.users.dataLoaded;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
const {
  authRequestSuccess,
  authRequestFailed,
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userCreated,
} = actions;

export default userReducer;
