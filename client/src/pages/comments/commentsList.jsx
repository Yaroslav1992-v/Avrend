import React from "react";
import PropTypes from "prop-types";
const CommentsList = ({ comments }) => {
  return <ul className="comments__list"></ul>;
};
CommentsList.propTypes = {
  comments: PropTypes.array,
};
export default CommentsList;
