import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/loader/loader";
import { getChatDataIsLoaded, loadChats } from "../../../store/chat";
import { Route, Routes } from "react-router-dom";
import Chat from "../../../pages/chats/chat";
import Chats from "../../../pages/chats/chats";

const ChatLoader = ({ children }) => {
  const dispatch = useDispatch();

  const dataLoaded = useSelector(getChatDataIsLoaded());
  useEffect(() => {
    dispatch(loadChats());
  }, [dataLoaded]);

  if (!dataLoaded) return <Loader />;
  return (
    <Routes>
      <Route index element={<Chats />}></Route>
      <Route path=":chatId" element={<Chat />} />
    </Routes>
  );
};
ChatLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
export default ChatLoader;
