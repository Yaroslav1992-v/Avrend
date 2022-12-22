import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoBack from "../../common/ui/goBack";
import NavDots from "../../common/ui/navDots";
import UserImage from "../../common/ui/userImage";
import { getChattedUser } from "../../store/chat";
import { getMessages, loadMessages, reciveMessage } from "../../store/messages";
import { getCurrentUserId } from "../../store/user";

import { getFullName } from "../../utils/helpers";
import MessageForm from "./components/messageForm";
import Messages from "./components/messages";
import Typing from "../../common/typing/Typing";
import { UseApp } from "../../common/ui/hoc/appLoader";
import { delMsgNots, getNotificationsByUser } from "../../store/notification";

const Chat = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector(getMessages());
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getChattedUser(chatId, currentUserId));
  let notifications = useSelector(getNotificationsByUser(user._id, "message"));
  const fullName = getFullName(user.firstName, user.lastName);
  const [typing, setTyping] = useState(false);
  const { socket } = UseApp();
  // const updateNots = (nots) => {
  //   return nots.map((n) => n._id);
  // };
  useEffect(() => {
    socket.emit("join chat", chatId);
    if (notifications.length > 0) {
      dispatch(delMsgNots(user._id, "message", chatId));
    }
    dispatch(loadMessages(chatId));
    socket.on("message recieved", (newMessage) => {
      dispatch(reciveMessage(newMessage));
    });
    // socket.on("notify recieved", (notf) => {
    //   socket.emit("deletedNot", notf, user._id);
    // });

    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
  }, []);
  const handleTyping = () => {
    if (!typing) {
      socket.emit("typing", chatId, user._id);
    }
    setTimeout(() => {
      socket.emit("stop typing", chatId, user._id);
    }, 5000);
  };
  return (
    <section className="chat">
      <div className="container">
        <div className="chat__container">
          <div className="chat__header">
            <GoBack />
            <div className="chat__user">
              <UserImage
                size={50}
                link={`/${user._id}`}
                img={user.picturePath}
              />
              <h1 className="chat__user-name">
                {fullName ? fullName : user.accountName}
              </h1>
            </div>
            <NavDots />
          </div>
          <Messages messages={messages} />
          {typing && <Typing />}
          <MessageForm
            onTyping={handleTyping}
            socket={socket}
            chatId={chatId}
            userId={currentUserId}
            to={user._id}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Chat);
