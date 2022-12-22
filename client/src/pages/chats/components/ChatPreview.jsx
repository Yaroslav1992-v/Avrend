import React from "react";
import { Link } from "react-router-dom";
import UserImage from "../../../common/ui/userImage";
import PropTypes from "prop-types";
import { getFullName } from "../../../utils/helpers";
import { AiOutlineCheck } from "react-icons/ai";
import { UseApp } from "../../../common/ui/hoc/appLoader";
import { useState } from "react";
import Typing from "../../../common/typing/Typing";
const ChatPreview = ({ user, link, text, date, notifications }) => {
  const fullName = getFullName(user.firstName, user.lastName);
  const [typing, setTyping] = useState(false);
  const { socket } = UseApp();
  const unread = notifications.filter((n) => n.from._id === user._id);
  const count = unread.length;
  socket.on("typing", (chat) => {
    if (chat === link) {
      setTyping(true);
    }
  });
  socket.on("stop typing", (chat) => {
    if (chat === link) {
      setTyping(false);
    }
  });
  return (
    <Link
      to={`${link}`}
      className={"chatPreview " + (count > 0 ? "chatPreview-unread" : "")}
    >
      <div className="chatPreview__image">
        <UserImage img={user.picturePath} size={70} />
      </div>
      <div className={"chatPreview__box "}>
        <p className="chatPreview__name">
          {fullName ? fullName : user.accountName}
        </p>
        {typing ? (
          <Typing />
        ) : (
          <p
            className={
              "chatPreview__lastMsg" +
              (count > 0 ? " chatPreview__lastMsg-unread" : "")
            }
          >
            {count > 0 ? unread[count - 1].content : text ? text : ""}
          </p>
        )}
        <div className="chatPreview__info">
          <span className="chatPreview__date">{date}</span>
          <div
            className={
              "chatPreview__status" +
              (count > 0 ? " chatPreview__status-unread" : "")
            }
          >
            <p>{count > 0 ? `Unread (${count})` : "Read"}</p>{" "}
            <AiOutlineCheck></AiOutlineCheck>
          </div>
        </div>
      </div>
    </Link>
  );
};
ChatPreview.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
  user: PropTypes.object,
  date: PropTypes.string,
  notifications: PropTypes.array,
};
export default ChatPreview;
