import React from "react";
import CommentLink from "./commentLink";
import LikeLink from "./likeLink";
import ShareLink from "./shareLink";
import PropTypes from "prop-types";
const PostBottom = ({ post, likes }) => {
  return (
    <div className="post__bottom">
      <div className="post__bottom-left">
        <LikeLink postLikes={likes} post={post} />
        <CommentLink postId={post._id} amount={post.comments.length} />
      </div>
      <div className="post__bottom-right">
        <ShareLink />
      </div>
    </div>
  );
};
PostBottom.propTypes = {
  post: PropTypes.object,
  likes: PropTypes.array,
};
export default PostBottom;
