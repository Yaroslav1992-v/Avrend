import React from "react";
import PropTypes from "prop-types";
const Message = ({ message, date, check }) => {
  return (
    <div className="chat__message ">
      <div
        className={
          "chat__message-content" +
          (check
            ? " chat__message-content-sent"
            : " chat__message-content-recived")
        }
      >
        <p className="chat__message-text">{message}</p>
      </div>
      <span className="chat__message-date">{date}</span>
    </div>
  );
};
Message.propTypes = {
  message: PropTypes.string,
  date: PropTypes.string,
  check: PropTypes.bool,
};
export default Message;
