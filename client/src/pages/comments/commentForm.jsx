import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserImage from "../../common/ui/userImage";
import { getCurrentUser } from "../../store/user";
import CommentField from "./commentField";
const CommentForm = () => {
  const currentUser = useSelector(getCurrentUser());
  const { postId } = useParams();
  const [comment, setComment] = useState({
    postId: postId,
    userId: currentUser.id,
    content: "",
  });
  const handleChange = ({ target }) => {
    setComment((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = () => {};
  return (
    <form className="comments__form" onSubmit={handleSubmit}>
      <div className="comments__form-sender">
        <UserImage size={30} img={currentUser.picturePath} />
      </div>
      <CommentField
        placeholder="Write a comment..."
        name={comment.content}
        onChange={handleChange}
      />

      <button className="comments__publish">Publish</button>
    </form>
  );
};

export default CommentForm;
