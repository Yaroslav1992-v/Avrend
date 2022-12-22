import React from "react";
import PropTypes from "prop-types";
import SearchedChat from "./serachedChat";
const SearchedChats = ({ users }) => {
  return (
    <ul className="chats__searchedChats">
      {users.map((user) => (
        <li key={user._id} className="chats__searchedChats-item">
          <SearchedChat user={user} />
        </li>
      ))}
    </ul>
  );
};

SearchedChats.propTypes = {
  users: PropTypes.array,
};
export default SearchedChats;
