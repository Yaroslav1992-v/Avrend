import React from "react";
import CommentField from "../commentField";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const CommentTop = ({ comment, content, edit, onEdit, accountName }) => {
  return (
    <div className="comment__top">
      <Link className="comment__author" to={`/${comment.userId}`}>
        {accountName}
      </Link>
      {edit ? (
        <CommentField
          focus={false}
          name="content"
          value={content}
          onChange={onEdit}
        />
      ) : (
        <div className="comment__content">
          <p>
            {comment.accountName && (
              <span className="comment__span">@{comment.accountName}</span>
            )}{" "}
            {comment.content}
          </p>
        </div>
      )}
    </div>
  );
};
CommentTop.propTypes = {
  comment: PropTypes.object,
  accountName: PropTypes.string,
  edit: PropTypes.bool,
  content: PropTypes.string,
  onEdit: PropTypes.func,
};
export default React.memo(CommentTop);
