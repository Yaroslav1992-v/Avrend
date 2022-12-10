import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getUsersByIds } from "../../store/user";
import UsersInfo from "./usersInfo";
const UsersPopUp = ({ data, title, setPopUp }) => {
  const users = useSelector(getUsersByIds(data));
  if (users.length === 0) {
    return;
  }
  return (
    <div className="users">
      <div className="users__header">
        <h4 className="users__title">{title}</h4>
        <button
          onClick={() => setPopUp((prevState) => !prevState)}
          className="users__close"
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="users__container">
        <ul className="users__list">
          {users.map((user) => (
            <li key={user._id} className="users__item">
              <UsersInfo user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
UsersPopUp.propTypes = {
  likes: PropTypes.array,
  setPopUp: PropTypes.func,
  title: PropTypes.string,
};
export default UsersPopUp;
