import React from "react";
import UserNav from "./userNav";
import UserPosts from "./userPosts";
import PropTypes from "prop-types";
const UserContent = ({ posts }) => {
  return (
    <div className="user__content">
      <UserNav />
      <UserPosts posts={posts} />
    </div>
  );
};
UserContent.propTypes = {
  posts: PropTypes.array,
};
export default UserContent;
