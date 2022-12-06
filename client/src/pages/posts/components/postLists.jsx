import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Post from "./post";
const PostList = ({ posts, user }) => {
  const sortedPost = _.orderBy(posts, ["createdAt"], ["desc"]);

  return (
    <ul className="post__list">
      {sortedPost.map((post) => (
        <li className="post__item" key={post._id}>
          <Post post={post} user={user} />
        </li>
      ))}
    </ul>
  );
};
PostList.propTypes = {
  posts: PropTypes.array,
  user: PropTypes.object,
};
export default PostList;
