import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";
const CommentsChildren = ({ comments, onReply }) => {
  return (
    <ul className="comment__children">
      {comments.map((comment) => (
        <li key={comment._id} className="comment__item">
          <Comment onReply={onReply} comment={comment} />
        </li>
      ))}
    </ul>
  );
};
CommentsChildren.propTypes = {
  comments: PropTypes.array,
  onReply: PropTypes.func,
};
export default CommentsChildren;
