import React from "react";
import PropTypes from "prop-types";
import UserImage from "../../../common/ui/userImage";
import { getFullName } from "../../../utils/helpers";
import { useDispatch } from "react-redux";
import { accessChat } from "../../../store/chat";
import { useNavigate } from "react-router-dom";

const SearchedChat = ({ user }) => {
  const fullName = getFullName(user.firstName, user.lastName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chat = async () => {
    const data = await dispatch(accessChat(user._id));
    navigate(data._id);
  };
  return (
    <div className="chats__searchedChats-user" onClick={chat}>
      <div className="chats__searchedChats-img">
        <UserImage img={user.picturePath} size={45} />
      </div>
      <div className="chats__searchedChats-info">
        <span className="chats__searchedChats-accName">{user.accountName}</span>
        {fullName && (
          <span className="chats__searchedChats-name">{fullName}</span>
        )}
      </div>
    </div>
  );
};
SearchedChat.propTypes = {
  user: PropTypes.object,
};
export default SearchedChat;
