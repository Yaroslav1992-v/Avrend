import React from "react";
import PropTypes from "prop-types";
import UserImage from "../../common/ui/userImage";
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment__sender">
        <UserImage />
      </div>
    </div>
  );
};
Comment.propTypes = {
  comment: PropTypes.array,
};
export default Comment;
