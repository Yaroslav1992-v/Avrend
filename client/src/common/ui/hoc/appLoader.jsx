import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/loader/loader";
import {
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
import { useNavigate } from "react-router-dom";
import { loadPostLikes } from "../../../store/postLike";
const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const getDataLoaded = useSelector(getUsersLoadingStatus());
  const getPostIsLoaded = useSelector(getPostLoadingStatus());
  const getCommentLoaded = useSelector(getCommentsLoadingStatus());
  // const getLikesIsLoaded = useSelector(getPostLoadingStatus());
  const dataLoaded = () => {
    return getDataLoaded && getPostIsLoaded && getCommentLoaded;
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUsersList());
      dispatch(loadPosts());
      dispatch(loadComments());
      dispatch(loadCommentLikes());
      dispatch(loadPostLikes());
    }
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  if (isLoggedIn && !dataLoaded()) return <Loader />;
  return children;
};
AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default AppLoader;
