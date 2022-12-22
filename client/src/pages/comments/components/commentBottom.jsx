import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import PropTypes from "prop-types";
import { transformDate } from "../../../utils/formatDate";
import { useDispatch } from "react-redux";
import { removeComment } from "../../../store/comments";
import UsersPopUp from "../../../common/ui/usersPopUp";

const CommentBottom = ({
  comment,
  edit,
  likes,
  onEdit,
  handleEdit,
  onReply,
  accountName,
  userId,
}) => {
  const dispatch = useDispatch();
  const date = transformDate(comment.created_at);
  const deleteComment = () => {
    dispatch(removeComment(comment._id, comment.postId));
  };
  const [popup, setPopup] = useState(false);
  return (
    <div className="comment__bottom">
      {edit ? (
        <>
          <button onClick={onEdit} className="comment__save">
            Save Edit
          </button>
          <button onClick={() => onEdit("cancel")} className="comment__cancel">
            <AiOutlineClose />
          </button>
        </>
      ) : (
        <>
          <span className="comment__bottom-data">{date}</span>
          <button
            onClick={() => setPopup((prevState) => !prevState)}
            className="comment__bottom-data"
          >
            liked : {likes.length}
          </button>
          <button
            onClick={() =>
              onReply({
                comment: { comment },
                parentId: comment._id,
                postId: comment.postId,
                accountName: accountName,
              })
            }
            className="comment__reply"
          >
            Reply
          </button>
          {userId === comment.userId && !edit && (
            <>
              <button className="comment__edit" onClick={handleEdit}>
                <FiEdit2 />
              </button>
              <button onClick={deleteComment} className="comment__delete">
                <RiDeleteBin6Fill />
              </button>
            </>
          )}
        </>
      )}
      {popup && <UsersPopUp title="likes" setPopUp={setPopup} data={likes} />}
    </div>
  );
};

CommentBottom.propTypes = {
  comment: PropTypes.object,
  likes: PropTypes.array,
  accountName: PropTypes.string,
  edit: PropTypes.bool,
  userId: PropTypes.string,
  onEdit: PropTypes.func,
  handleEdit: PropTypes.func,
  onReply: PropTypes.func,
};
export default CommentBottom;
