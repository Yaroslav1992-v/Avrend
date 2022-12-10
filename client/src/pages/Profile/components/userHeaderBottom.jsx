import React, { useState } from "react";
import PropTypes from "prop-types";
import UsersPopUp from "../../../common/ui/usersPopUp";
const HeaderBottom = ({ data }) => {
  const { posts, following, followers } = data;
  const [followersPopUp, setFollowersPopUp] = useState(false);
  const [followingPopUp, setFollowingPopUp] = useState(false);
  return (
    <>
      <ul className="user__header-bottom">
        <li className="user__header-item">
          <p className="user__header-key">Post</p>
          <p className="user__header-number">{posts}</p>
        </li>
        <li className="user__header-item">
          <button onClick={() => setFollowingPopUp((prevState) => !prevState)}>
            <p className="user__header-key">Following</p>
            <p className="user__header-number">{following.length}</p>
          </button>
        </li>
        <li className="user__header-item">
          <button onClick={() => setFollowersPopUp((prevState) => !prevState)}>
            <p className="user__header-key">Followers</p>
            <p className="user__header-number">{followers.length}</p>
          </button>
        </li>
      </ul>
      {followersPopUp && (
        <UsersPopUp
          title="followers"
          setPopUp={setFollowersPopUp}
          data={followers}
        />
      )}
      {followingPopUp && (
        <UsersPopUp
          title="followers"
          setPopUp={setFollowingPopUp}
          data={following}
        />
      )}
    </>
  );
};
HeaderBottom.propTypes = {
  user: PropTypes.object,
  data: PropTypes.object,
};
export default HeaderBottom;
