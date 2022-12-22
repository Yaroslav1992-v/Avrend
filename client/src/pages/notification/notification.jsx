import React from "react";
import PropTypes from "prop-types";
import UserImage from "../../common/ui/userImage";
import { getFullName } from "../../utils/helpers";
import { transformDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteNotifications,
  updateNotifications,
} from "../../store/notification";
import { AiOutlineClose } from "react-icons/ai";
const Notification = ({ notification }) => {
  const fullName = getFullName(
    notification.from.firstName,
    notification.from.lastName
  );
  const { type, read, _id, typeId, content } = notification;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notif = (type) => {
    let link = "";
    let text = "";
    switch (type) {
      case "message":
        link = `/chats/${typeId}`;
        text =
          "sent you " +
          (notification.count > 1
            ? `${notification.count} messages`
            : "a message");
        break;
      case "comment":
        link = `/p/${typeId}/comments`;
        text = "commented your post";
        break;
      case "commentReply":
        link = `/p/${notification.parentId}/comments`;
        text = "replied to your comment";
        break;
      case "commentLike":
        link = `/p/${typeId}/comments`;
        text = "liked your comment";
        break;
      case "like":
        link = `/`;
        text =
          (notification.count !== 0
            ? ` and ${notification.count} others `
            : "") + `liked your post`;
        break;
      case "follow":
        text = "has followed you";
        link = `/${typeId}`;
        break;
      default:
        break;
    }
    return { link, text };
  };
  const { link, text } = notif(type);
  const readNotification = () => {
    if (type !== "message" && !read) {
      dispatch(updateNotifications([notification], "read"));
    }
    navigate(link);
  };
  const removeNot = () => {
    dispatch(deleteNotifications(type, notification.from._id, typeId, _id));
  };
  return (
    <div
      className={
        "notification" + (notification.read ? " notification-read" : "")
      }
    >
      <div className="notification__sender">
        <UserImage
          size={35}
          link={`/${notification.from._id}`}
          img={notification.from.picturePath}
        />
      </div>
      <div onClick={readNotification} className="notification__content">
        <div className="notification__date">
          {transformDate(notification.createdAt)}
        </div>
        <div className="notification__data">
          {fullName ? fullName : notification.from.accountName} {text}
          {notification.typeName && (
            <span className="notification__name"> {notification.typeName}</span>
          )}
        </div>
        <div className="notification__text">
          <p>{content}</p>
        </div>
      </div>
      {type !== "message" && (
        <button onClick={removeNot} className="notification__remove">
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
};

export default Notification;
