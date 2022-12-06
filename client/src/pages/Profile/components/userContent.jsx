import React from "react";
import UserNav from "./userNav";
import UserPosts from "./userPosts";
import PropTypes from "prop-types";
const UserContent = ({ userId }) => {
  return (
    <div className="user__content">
      <UserNav />
      <UserPosts userId={userId} />
    </div>
  );
};
UserContent.propTypes = {
  userId: PropTypes.string,
};
export default UserContent;
