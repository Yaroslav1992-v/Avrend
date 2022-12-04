import React from "react";
import UserNav from "./userNav";
import UserPosts from "./userPosts";
const UserContent = () => {
  return (
    <div className="user__content">
      <UserNav />
      <UserPosts />
    </div>
  );
};

export default UserContent;
