import React from "react";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
const UserNav = () => {
  const [arrow, setArrow] = useState(true);
  const handleArrow = () => {
    setArrow((prevState) => !prevState);
  };
  return (
    <div className="user__nav">
      <h4 className="user__title">My Post</h4>
      <button onClick={handleArrow} className="user__btn">
        Photos
        {arrow ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />}
      </button>
    </div>
  );
};

export default UserNav;
