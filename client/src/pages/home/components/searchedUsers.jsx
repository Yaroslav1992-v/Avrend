import React from "react";
import UsersInfo from "../../../common/ui/usersInfo";
import PropTypes from "prop-types";
const SeacherUsers = ({ users }) => {
  return (
    <div className="home__users">
      <ul className="home__users-list">
        {users.map((user) => (
          <li key={user._id} className="home__users-item">
            <UsersInfo user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};
SeacherUsers.propTypes = {
  users: PropTypes.array,
};

export default SeacherUsers;
