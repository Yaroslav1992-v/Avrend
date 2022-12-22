import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { AiTwotoneHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { likePost, removeLikeFromPost } from "../../../store/postLike";
import UsersPopUp from "../../../common/ui/usersPopUp";
import { UseApp } from "../../../common/ui/hoc/appLoader";
import { createNotification } from "../../../store/notification";
import notificationService from "../../../services/notification.service";
const LikeLink = ({ post, postLikes }) => {
  const { socket } = UseApp();
  const [liked, setLiked] = useState({});
  const [popup, setPopup] = useState(false);
  const currentUser = useSelector(getCurrentUserId());
  const subsContent = (content) =>
    content.length > 35 ? content.substring(0, 35) + "..." : content;
  const dispatch = useDispatch();
  const submitLike = async () => {
    if (Object.keys(liked).length === 0) {
      const check = await dispatch(
        likePost({ postId: post._id, userId: currentUser }, post)
      );
      setLiked(check);
      const notification = await dispatch(
        createNotification({
          type: "like",
          notifier: post.userId,
          typeId: post._id,
          typeName: subsContent(post.content),
        })
      );
      socket.emit("notify", notification, post.userId);
    } else {
      await dispatch(removeLikeFromPost(liked._id));
      setLiked({});
      const deletedNot = await notificationService.deleteNotificationBySender(
        post._id,
        "like"
      );

      if (deletedNot) {
        socket.emit("deletedNot", deletedNot, post.userId);
      }
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
