import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onReply, allComments }) => {
  // const findAllChildren = (replies, idx) => {
  //   replies.forEach((c) => {
  //     const comment = sortedComments.find((s) => s._id === c);
  //     if (comment) {
  //       childrenComments.push(comment);
  //     }
  //   });

  //   for (let i = idx + 1; i < childrenComments.length; i++) {
  //     if (childrenComments[i].replies.length > 0) {
  //       findAllChildren(childrenComments[i].replies, i + 1);
  //     }
  //   }
  // };
  // findAllChildren(parentComments[0].replies, -1);
  return (
    <ul className="comments__list">
      {comments.map((comment) => (
        <li key={comment._id} className="comment__item">
          <Comment onReply={onReply} comment={comment} comments={allComments} />
        </li>
      ))}
    </ul>
  );
};
CommentsList.propTypes = {
  comments: PropTypes.array,
  allComments: PropTypes.array,
  onReply: PropTypes.func,
};
export default CommentsList;
