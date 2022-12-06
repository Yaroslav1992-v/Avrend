import React from "react";
import CommentLink from "./commentLink";
import LikeLink from "./likeLink";
import ShareLink from "./shareLink";
import PropTypes from "prop-types";
const PostBottom = ({ postId }) => {
  return (
    <div className="post__bottom">
      <div className="post__bottom-left">
        <LikeLink amount={221} />
        <CommentLink postId={postId} amount={12} />
      </div>
      <div className="post__bottom-right">
        <ShareLink />
      </div>
    </div>
  );
};
PostBottom.propTypes = {
  postId: PropTypes.string,
};
export default PostBottom;
