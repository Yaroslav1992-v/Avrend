import React, { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/user";
import { transformDate } from "../../../utils/formatDate";
import Message from "./message";
const Messages = ({ messages }) => {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
  }, [messages]);
  const id = useSelector(getCurrentUserId());
  const checkId = (userId) => userId === id;
  return (
    <ul ref={bottomRef} className="chat__messages">
      {messages.map((m) => (
        <li
          key={m._id}
          className={
            "chat__messagesBox" +
            (checkId(m.userId)
              ? " chat__messagesBox-sent"
              : " chat__messagesBox-recived")
          }
        >
          <Message
            check={checkId(m.userId)}
            message={m.content}
            date={transformDate(m.createdAt)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Messages;
