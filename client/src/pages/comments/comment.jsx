import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserImage from "../../common/ui/userImage";
import { useDispatch, useSelector } from "react-redux";
import { findUserById, getCurrentUserId } from "../../store/user";
import { BsFillHeartFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import CommentsChildren from "./commentsChildren";
import {
  getCommentLikesLoadingStatus,
  getLikesById,
  likeComment,
  removeLikeFromComment,
} from "../../store/commentLike";
import Loader from "../../common/loader/loader";
import { updateComment } from "../../store/comments";
import CommentTop from "./components/commentTop";
import CommentBottom from "./components/commentBottom";
const Comment = ({ comment, onReply, comments }) => {
  console.log("ch");
  const user = useSelector(findUserById(comment.userId));
  const userId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesById(comment._id));
  const commentsLikesLoaded = useSelector(getCommentLikesLoadingStatus());
  const [commentLike, setCommentLike] = useState({});
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit((prevState) => !prevState);
  };
  const [content, setContent] = useState({
    content: comment.content,
  });
  const handleEditContent = ({ target }) => {
    setContent((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const onEdit = async (data) => {
    if (data === "cancel") {
      setEdit(false);
      return;
    }
    const editedComment = { ...comment, content: content.content };
    const check = await dispatch(updateComment(editedComment));
    if (check) {
      setEdit(false);
    }
  };
  useEffect(() => {
    const check = likes.find((like) => like.userId === userId);
    if (check) {
      setCommentLike(check);
    }
  }, [commentsLikesLoaded]);
  const dispatch = useDispatch();
  const children = comments
    ? comments.filter((c) => c.parentId === comment._id)
    : null;
  const [toggleChildren, setToggleChildren] = useState(!children);
  const handleToggleChildren = () => {
    setToggleChildren(true);
  };
  const handleLike = async () => {
    if (Object.keys(commentLike).length === 0) {
      const like = { userId: userId, commentId: comment._id };
      const content = await dispatch(likeComment(like, comment));
      if (content) {
        setCommentLike(content);
      }
    } else {
      const likes = comment.likes.filter((l) => commentLike._id !== l);
      const check = await dispatch(
        removeLikeFromComment(commentLike._id, { ...comment, likes: likes })
      );
      if (check) {
        setCommentLike(-1);
      }
    }
  };

  if (commentsLikesLoaded && user) {
    return (
      <div className="comment">
        <div className="comment__container">
          <div className="comment__sender">
            <UserImage
              link={`/${comment.userId}`}
              size={25}
              img={user.picturePath}
            />
          </div>
          <div className="comment__box">
            <CommentTop
              comment={comment}
              accountName={user.accountName}
              edit={edit}
              onEdit={handleEditContent}
              content={content.content}
            />
            <CommentBottom
              edit={edit}
              onEdit={onEdit}
              userId={userId}
              accountName={user.accountName}
              comment={comment}
              handleEdit={handleEdit}
              likes={likes}
              onReply={onReply}
            />
          </div>
          <button onClick={handleLike} className="comment__like">
            {Object.keys(commentLike).length > 0 ? (
              <FcLike />
            ) : (
              <BsFillHeartFill />
            )}
          </button>
        </div>
        {!toggleChildren && children.length > 0 && (
          <button onClick={handleToggleChildren} className="comments__toggle">
            Watch {children.length} replies
          </button>
        )}
        {children && toggleChildren && (
          <CommentsChildren comments={children} onReply={onReply} />
        )}
      </div>
    );
  } else {
    return <Loader />;
  }
};
Comment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  onReply: PropTypes.func,
};
export default React.memo(Comment);
