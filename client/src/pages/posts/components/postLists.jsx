import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Post from "./post";
import { useSelector } from "react-redux";
import { getLikes } from "../../../store/postLike";
const PostList = ({ posts, user }) => {
  const sortedPost = _.orderBy(posts, ["createdAt"], ["desc"]);
  const likes = useSelector(getLikes());
  if (likes) {
    return (
      <ul className="post__list">
        {sortedPost.map((post) => (
          <li className="post__item" key={post._id}>
            <Post likes={likes} post={post} user={user} />
          </li>
        ))}
      </ul>
    );
  }
};
PostList.propTypes = {
  posts: PropTypes.array,
  user: PropTypes.object,
};
export default PostList;
