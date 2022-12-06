import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getPostsById } from "../../../store/post";
const UserPosts = ({ userId }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const posts = useSelector(getPostsById(userId));
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
  userId: PropTypes.string,
};
export default UserPosts;
