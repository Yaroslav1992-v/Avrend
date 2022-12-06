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
const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const getDataLoaded = useSelector(getUsersLoadingStatus());
  const getPostIsLoaded = useSelector(getPostLoadingStatus());
  const dataLoaded = () => {
    return getDataLoaded && getPostIsLoaded;
  };
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(loadUsersList());
      dispatch(loadPosts());
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
