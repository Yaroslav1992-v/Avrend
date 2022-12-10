import React, { useState } from "react";
import PropTypes from "prop-types";
import UserImage from "./userImage";
import { Link } from "react-router-dom";
import { getFullName } from "../../utils/helpers";
import { getCurrentUser, updateUser } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
const UsersInfo = ({ user }) => {
  const fullName = getFullName(user.firstName, user.lastName);
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
    <div className="users__like">
      <div className="users__user">
        <div className="users__userImg">
          <UserImage size={40} img={user.picturePath} link={`/${user._id}`} />
        </div>
        <div className="users__user-info">
          <Link className="users__link" to={`/${user._id}`}>
            {user.accountName}
          </Link>
          {fullName && <span className="users__user-name">{fullName}</span>}
        </div>
      </div>
      <button onClick={follow} className="users__follow">
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};
UsersInfo.propTypes = {
  user: PropTypes.object,
};
export default UsersInfo;
