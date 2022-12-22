import { createSlice } from "@reduxjs/toolkit";
import notificationService from "../services/notification.service";
const initialState = {
  entities: [],
  isLoading: true,
  error: null,
  dataLoaded: false,
};
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationRequested: (state) => {
      state.isLoading = true;
    },
    notificationReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    notificationRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    notificationCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    notificationUpdated: (state, action) => {
      action.payload.notif.forEach((n) => {
        const index = state.entities.findIndex((i) => i._id === n._id);
        if (action.payload.type === "seen") {
          state.entities[index].seen = true;
        } else {
          state.entities[index].read = true;
        }
      });
    },
    notificationDeleted: (state, action) => {
      state.entities = state.entities.filter((n) => n._id !== action.payload);
    },
    msgNotsDeleted: (state, action) => {
      const { chatId } = action.payload;
      state.entities = state.entities.filter((n) => n.typeId !== chatId);
    },
    notificationsDeleted: (state, action) => {
      const k = state.entities;
      const d = k.filter((n) => {
        console.log(n.from._id !== action.payload.from);
        return (
          n.type !== action.payload.type &&
          n.from._id !== action.payload.from &&
          n.typeId !== action.payload.typeId
        );
      });
    },
  },
});
export const loadNotifications = () => async (dispatch) => {
  dispatch(notificationRequested());
  try {
    const data = await notificationService.getNotifications();

    dispatch(notificationReceived(data));
  } catch (error) {
    dispatch(notificationRequestFailed(error.message));
  }
};

export const createNotification = (not) => async (dispatch) => {
  try {
    const data = await notificationService.createNotification(not);
    return data;
  } catch (error) {
    dispatch(notificationRequestFailed(error.message));
  }
};
export const reciveNotifcation = (msg) => (dispatch) => {
  dispatch(notifCreated(msg));
};
export const getMessageNotifications = (user) => (state) =>
  state.notification.entities.filter((n) => n.type === "message" && !n.read);
export const getNotificationsByUser = (user, type) => (state) =>
  state.notification.entities.filter(
    (n) => n.type === type && !n.read && n.from._id === user
  );

export const updateNotifications = (notif, type) => async (dispatch) => {
  try {
    await notificationService.updateNotifications(notif, type);
    dispatch(notificationUpdated({ notif, type }));
  } catch (error) {
    dispatch(notificationRequestFailed(error.message));
  }
};
export const delMsgNots = (id, type, chatId) => async (dispatch) => {
  try {
    await notificationService.delMsgNots(id, type);
    dispatch(msgNotsDeleted({ chatId }));
  } catch (error) {
    dispatch(notificationRequestFailed(error.message));
  }
};
export const deleteNotifications =
  (type, from, typeId, _id) => async (dispatch) => {
    try {
      const notifications = await notificationService.deleteNotifications(
        type,
        from,
        typeId
      );
      dispatch(notificationDeleted(_id));
    } catch (error) {
      dispatch(notificationRequestFailed(error.message));
    }
  };

const updateNotificationsType = (user, type, typeId) => (state) => {
  let notifications = state.notification.entities.filter(
    (n) => n.type === type && n.from._id === user && !n.read && type
  );

  notifications = notifications.map((n) => ({ ...n, read: true }));

  return notifications;
};
export const removedNotification = (id) => (dispatch) => {
  dispatch(notificationDeleted(id));
};
export const getAllNotifcations = () => (state) => {
  const messageNots = [];
  const likeNots = [];
  const otherNots = [];
  const unreadNots = [];
  const unseenNots = [];
  state.notification.entities.forEach((n) => {
    if (!n.seen) {
      unseenNots.push(n);
    }
    if (n.type === "message") {
      messageNots.push({ ...n, count: 0 });
    } else if (n.type === "like") {
      likeNots.push({ ...n, count: 0 });
    } else if (n.read) {
      otherNots.push(n);
    } else {
      unreadNots.push(n);
    }
  });
  likeNots.forEach((l, idx) => {
    for (let i = idx + 1; i < likeNots.length; i++) {
      if (l.typeId === likeNots[i].typeId) {
        likeNots[idx] = likeNots[i];
        likeNots[idx].count++;
        likeNots.splice(i--, 1);
      }
    }
  });

  messageNots.forEach((m, idx) => {
    let counter = 1;
    for (let i = idx + 1; i < messageNots.length; i++) {
      if (m.from._id === messageNots[i].from._id) {
        counter++;
        m.content = messageNots[i].content;
        messageNots.splice(i--, 1);
      }
    }
    m.count = counter;
  });
  return {
    nots: [...messageNots, ...likeNots, ...unreadNots, ...otherNots],
    unseenNots,
  };
};
export const getAllUnseenCount = () => (state) =>
  state.notification.entities.reduce((acc, n) => (!n.seen ? ++acc : acc), 0);
export const notifCreated = (data) => (dispatch) =>
  dispatch(notificationCreated(data));
const { reducer: notificationReducer, actions } = notificationSlice;
const {
  notificationRequested,
  notificationReceived,
  notificationUpdated,
  notificationRequestFailed,
  notificationCreated,
  notificationDeleted,
  msgNotsDeleted,
  notificationsDeleted,
} = actions;
export default notificationReducer;
