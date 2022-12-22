import { createSlice } from "@reduxjs/toolkit";
import messageService from "../services/messageService";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    messagesRequested: (state) => {
      state.isLoading = true;
    },
    messagesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    messagesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    messageCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
  },
});
export const loadMessages = (chatId) => async (dispatch) => {
  dispatch(messagesRequested());
  try {
    const data = await messageService.loadMessages(chatId);

    dispatch(messagesReceived(data));
  } catch (error) {
    dispatch(messagesRequestFailed(error.message));
  }
};
export const sendMessage = (message) => async (dispatch) => {
  try {
    const data = await messageService.sendMessage(message);
    dispatch(messageCreated(data));
    return data;
  } catch (error) {
    dispatch(messagesRequestFailed(error.message));
  }
};
export const getMessagesDataLoaded = () => (state) => state.messages.dataLoaded;
export const reciveMessage = (msg) => (dispatch) => {
  dispatch(messageCreated(msg));
};
export const getMessages = () => (state) => state.messages.entities;
const { reducer: messagesReducer, actions } = messagesSlice;
const {
  messagesRequested,
  messagesReceived,
  messagesRequestFailed,
  messageCreated,
} = actions;
export default messagesReducer;
