import { createAction, createSlice } from "@reduxjs/toolkit";
import chatService from "../services/chat.service";
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    chatsRequested: (state) => {
      state.isLoading = true;
    },
    chatsReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    chatsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    chatCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
  },
});
export const loadChats = (userId) => async (dispatch) => {
  dispatch(chatsRequested());
  try {
    const data = await chatService.loadChats(userId);

    dispatch(chatsReceived(data));
  } catch (error) {
    dispatch(chatsRequestFailed(error.message));
  }
};
export const accessChat = (id) => async (dispatch) => {
  try {
    const data = await chatService.accessChat(id);
    dispatch(chatCreated(data));
    return data;
  } catch (error) {
    dispatch(chatsRequestFailed(error.message));
  }
};
export const getChatDataIsLoaded = () => (state) => state.chat.dataLoaded;
export const getChattedUser = (chatId, userId) => (state) => {
  const chat = state.chat.entities.find((chat) => chat._id === chatId);
  return chat.users.find((u) => u._id !== userId);
};
export const getChatById = (id) => (state) =>
  state.chat.entities.find((chat) => chat._id === id);
export const getChats = () => (state) => state.chat.entities;
const { reducer: chatReducer, actions } = chatSlice;
const { chatsRequested, chatsReceived, chatsRequestFailed, chatCreated } =
  actions;
export default chatReducer;
