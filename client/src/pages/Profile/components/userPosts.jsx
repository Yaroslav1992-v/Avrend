import React from "react";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
const UserPosts = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <ul className="user__posts">
      {arr.map((el) => (
        <li key={el} className="user__post">
          <Link className="user__link" to="/post">
            <img
              src="https://tinypng.com/images/social/website.jpg"
              alt="post img"
            />
          </Link>
          <div className="user__likeBox">
            <button className="user__like">
              <AiFillHeart />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserPosts;
