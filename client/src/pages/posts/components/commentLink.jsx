import React from "react";
import { FaComment } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CommentLink = ({ amount, postId }) => {
  return (
    <Link to={`/p/${postId}/comments`} className="action">
      <button className="action__btn">
        <FaComment className="action_svg" />
      </button>
      <span className="action__amount">{amount}</span>
    </Link>
  );
};
CommentLink.propTypes = {
  amount: PropTypes.number,
  postId: PropTypes.string,
};
export default CommentLink;
