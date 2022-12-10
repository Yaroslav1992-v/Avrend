import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import PropTypes from "prop-types";
const UserPosts = ({ posts }) => {
  return (
    <>
      <ul className="user__posts">
        {posts.map((post) => (
          <li key={post._id} className="user__post">
            <Link className="user__link" to="posts" state={posts}>
              <img src={post.picturePath} alt="post img" />
            </Link>
            <div className="user__likeBox">
              <button className="user__like">
                <AiFillHeart />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Outlet context={posts} />
    </>
  );
};

UserPosts.propTypes = {
  posts: PropTypes.array,
};
export default UserPosts;
