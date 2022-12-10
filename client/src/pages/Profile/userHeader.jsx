import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import HeaderBottom from "./components/userHeaderBottom";
import HeaderTop from "./components/userHeaderTop";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, updateUser } from "../../store/user";
const UserHeader = ({ user, data }) => {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUser());
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(
    currentUser.following.includes(user._id)
  );

  const follow = () => {
    const followers = isFollowing
      ? user.followers.filter((id) => id !== currentUser._id)
      : [...user.followers, currentUser._id];
    const following = isFollowing
      ? currentUser.following.filter((id) => id !== user._id)
      : [...currentUser.following, user._id];
    const pageUser = { ...user, followers: followers };
    const currentUserData = {
      ...currentUser,
      following: following,
    };
    dispatch(updateUser(pageUser, pageUser._id));
    dispatch(updateUser(currentUserData, currentUser._id));
    setIsFollowing((prevState) => !prevState);
  };
  return (
    <div className="user__header">
      <HeaderTop {...user} />
      <div className="user__actions">
        {userId === currentUser._id ? (
          <>
            <Link to="edit" className="user__action-link">
              Edit Profile
            </Link>
            <Link to="addPost" className="user__action-link">
              Add post
            </Link>
          </>
        ) : (
          <>
            <button onClick={follow} className="user__action-link">
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
            <Link to="/chat" className="user__action-link">
              Send Message
            </Link>
          </>
        )}
      </div>
      <HeaderBottom data={data} />
    </div>
  );
};
UserHeader.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
};
export default UserHeader;
