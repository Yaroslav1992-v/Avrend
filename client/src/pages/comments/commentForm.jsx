import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../common/loader/loader";
import UserImage from "../../common/ui/userImage";
import { createComment, createCommentReply } from "../../store/comments";
import { getCurrentUser } from "../../store/user";
import CommentField from "./commentField";
import PropTypes from "prop-types";
const CommentForm = ({ reply }) => {
  const currentUser = useSelector(getCurrentUser());
  const { postId } = useParams();
  const [comment, setComment] = useState({
    postId: postId,
    userId: currentUser._id,
    content: "",
  });
  useEffect(() => {
    setComment((prevState) => ({
      ...prevState,
      content: reply.accountName ? `@${reply.accountName} ` : "",
    }));
  }, [reply]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const handleChange = ({ target }) => {
    setComment((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    let check;
    if (Object.keys(reply).length > 0) {
      const repliedComment = { ...reply.comment };
      delete reply.comment;
      const newComment = {
        ...reply,
        ...comment,
        createdAt: Date(),
        content: comment.content.substring(reply.accountName.length + 2),
      };

      check = await dispatch(
        createCommentReply(newComment, repliedComment, repliedComment._id)
      );
    } else {
      check = await dispatch(createComment({ ...comment, createdAt: Date() }));
    }

    if (check) {
      setLoader(false);
    }
  };
  return (
    <>
      <form className="comments__form" onSubmit={handleSubmit}>
        <div className="comments__form-sender">
          <UserImage size={30} img={currentUser.picturePath} />
        </div>
        <CommentField
          focus={reply.accountName ? true : false}
          placeholder="Write a comment..."
          name="content"
          value={comment.content}
          onChange={handleChange}
        />

        <button className="comments__publish">Publish</button>
      </form>
      {loader && <Loader />}
    </>
  );
};
CommentForm.propTypes = {
  reply: PropTypes.object,
};
export default CommentForm;
