import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchQuery from "../../../common/form/searchQuery";
import { getAllUsers, getCurrentUserId } from "../../../store/user";
import { getFullName } from "../../../utils/helpers";
import SeacherUsers from "./searchedUsers";
const HomeHeader = () => {
  const users = useSelector(getAllUsers());
  const currentUserId = useSelector(getCurrentUserId());
  const [query, setQuery] = useState("");
  const handleSearch = ({ target }) => {
    setQuery(target.value.trim().toLowerCase());
  };
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
  return (
    <div className="home__header">
      <h1 className="home__title">
        Find out
        <br /> your interest
      </h1>
      <div className="home__search">
        <SearchQuery placeholder="Find User" onChange={handleSearch} />
      </div>
      {searchedUsers.length > 0 && <SeacherUsers users={searchedUsers} />}
    </div>
  );
};

export default HomeHeader;
