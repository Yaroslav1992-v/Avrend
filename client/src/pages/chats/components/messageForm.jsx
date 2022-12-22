import React, { useRef } from "react";
import PropTypes from "prop-types";
import { BsFillEmojiSmileFill, BsArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../../store/messages";
import { createNotification } from "../../../store/notification";

const MessageForm = ({ socket, chatId, userId, to, onTyping }) => {
  const msg = useRef();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    let check = false;
    e.preventDefault();
    const newMessage = {
      chatId: chatId,
      userId: userId,
      content: msg.current.value,
    };
    const data = await dispatch(sendMessage(newMessage));
    socket.emit("new message", data, to, userId);

    socket.on("users check", async (users) => {
      if (users < 2 && !check) {
        check = true;
        const notification = await dispatch(
          createNotification({
            type: "message",
            notifier: to,
            typeId: chatId,
            content: data.content,
          })
        );
        socket.emit("notify", notification, to);
      }
    });
    socket.emit("stop typing", chatId, to);
    msg.current.value = "";
  };
  return (
    <form onSubmit={handleSubmit} className="message__form">
      <div className="message__formBox">
        <div className="message__emojis">
          <button>
            <BsFillEmojiSmileFill />
          </button>
        </div>
        <textarea
          onChange={onTyping}
          ref={msg}
          className="message__textArea"
          placeholder="Type  message..."
        ></textarea>
        <button className="message__submit">
          <BsArrowRight />
        </button>
      </div>
    </form>
  );
};
MessageForm.propTypes = {
  userId: PropTypes.string,
  chatId: PropTypes.string,
};

export default MessageForm;
