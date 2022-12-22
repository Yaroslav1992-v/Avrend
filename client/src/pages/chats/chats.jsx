import React, { useState, useEffect } from "react";
import SearchQuery from "../../common/form/searchQuery";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getCurrentUserId } from "../../store/user";
import { getFullName } from "../../utils/helpers";
import SearchedChats from "./components/searchedChats";
import { getChats, loadChats } from "../../store/chat";
import ChatPreview from "./components/ChatPreview";
import { transformDate } from "../../utils/formatDate";
import { getMessageNotifications } from "../../store/notification";

const Chats = () => {
  const users = useSelector(getAllUsers());
  const chats = useSelector(getChats());
  const notifications = useSelector(getMessageNotifications());
  const currentUserId = useSelector(getCurrentUserId());
  const [query, setQuery] = useState("");
  const handleSearch = ({ target }) => {
    setQuery(target.value.trim().toLowerCase());
  };
  const fitlteredChats = chats.filter((c) => c.latestMessage);
  const searchedUsers = query
    ? users.filter(
        (user) =>
          user._id !== currentUserId &&
          (user.accountName.toLowerCase().includes(query) ||
            getFullName(user.firstName, user.lastName)
              .toLowerCase()
              .includes(query))
      )
    : [];
  const dispatch = useDispatch();
  useEffect(() => {}, [notifications]);
  useEffect(() => {
    dispatch(loadChats(currentUserId));
  }, []);
  const getUser = (users) => {
    return users.find((u) => u._id !== currentUserId);
  };
  return (
    <section className="chats">
      <div className="container">
        <NavBar title="Chats" check={true} children={<GoBack />} />
        <div className="chats__container">
          <div className="chats__top">
            <SearchQuery placeholder={"Chat"} onChange={handleSearch} />
            {searchedUsers.length > 0 && (
              <SearchedChats users={searchedUsers} />
            )}
          </div>
          <div className="chats__box">
            <ul className="chats__chats">
              {fitlteredChats.map((chat) => (
                <li key={chat._id} className="chats__item">
                  <ChatPreview
                    notifications={notifications}
                    status={"Read"}
                    text={chat.latestMessage.content}
                    date={transformDate(chat.latestMessage.createdAt)}
                    link={chat._id}
                    user={getUser(chat.users)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chats;
