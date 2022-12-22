import React, { useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/loader/loader";
import {
  getCurrentUserId,
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../../../store/user";
import { getPostLoadingStatus, loadPosts } from "../../../store/post";
import {
  getCommentsLoadingStatus,
  loadComments,
} from "../../../store/comments";
import { loadCommentLikes } from "../../../store/commentLike";
import { useNavigate, useParams } from "react-router-dom";
import { loadPostLikes } from "../../../store/postLike";
import { io } from "socket.io-client";
import configFile from "../../../config.json";

import {
  createNotification,
  loadNotifications,
  reciveNotifcation,
  removedNotification,
} from "../../../store/notification";

let socket;
const AppContex = createContext();
const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const getDataLoaded = useSelector(getUsersLoadingStatus());
  const getPostIsLoaded = useSelector(getPostLoadingStatus());
  const getCommentLoaded = useSelector(getCommentsLoadingStatus());
  const currentUserId = useSelector(getCurrentUserId());
  const dataLoaded = () => {
    return getDataLoaded && getPostIsLoaded && getCommentLoaded;
  };
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      socket = io(configFile.apiEndPoint);
      socket.emit("setup", currentUserId);
      socket.on("notify recieved", (notf) => {
        dispatch(reciveNotifcation(notf));
      });
      socket.on("notify removed", (notf) => {
        dispatch(removedNotification(notf));
      });

      dispatch(loadUsersList());
      dispatch(loadPosts());
      dispatch(loadComments());
      dispatch(loadCommentLikes());
      dispatch(loadPostLikes());
      dispatch(loadNotifications());
    }
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  if (isLoggedIn && !dataLoaded()) return <Loader />;

  return <AppContex.Provider value={{ socket }}>{children}</AppContex.Provider>;
};
export const UseApp = () => {
  return useContext(AppContex);
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
