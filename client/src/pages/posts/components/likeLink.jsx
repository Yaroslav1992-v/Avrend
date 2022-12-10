import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiTwotoneHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { likePost, removeLikeFromPost } from "../../../store/postLike";
import UsersPopUp from "../../../common/ui/usersPopUp";
const LikeLink = ({ post, postLikes }) => {
  const [liked, setLiked] = useState({});
  const [popup, setPopup] = useState(false);
  const currentUser = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const submitLike = async () => {
    if (Object.keys(liked).length === 0) {
      const check = await dispatch(
        likePost({ postId: post._id, userId: currentUser }, post)
      );
      setLiked(check);
    } else {
      await dispatch(removeLikeFromPost(liked._id));
      setLiked({});
    }
  };

  useEffect(() => {
    const ifUserLiked = postLikes.find((l) => l.userId === currentUser);
    if (ifUserLiked) {
      setLiked(ifUserLiked);
    }
  }, [postLikes]);

  return (
    <div className="action">
      <button onClick={submitLike} className="action__btn">
        {Object.keys(liked).length > 0 ? (
          <FcLike />
        ) : (
          <AiTwotoneHeart className="action__notLiked" />
        )}
      </button>
      <button
        onClick={() => setPopup((prevState) => !prevState)}
        className="action__amount"
      >
        {postLikes.length}
      </button>
      {popup && (
        <UsersPopUp title="Likes" setPopUp={setPopup} data={postLikes} />
      )}
    </div>
  );
};
LikeLink.propTypes = {
  post: PropTypes.object,
};
export default LikeLink;
