import React from "react";
import { Link } from "react-router-dom";
import HeaderBottom from "./components/userHeaderBottom";
import HeaderTop from "./components/userHeaderTop";
import PropTypes from "prop-types";
const UserHeader = ({ user }) => {
  console.log(user);
  return (
    <div className="user__header">
      <HeaderTop {...user} />
      <div className="user__edit">
        <Link to="edit" className="user__edit-link">
          Edit Profile
        </Link>
      </div>
      <HeaderBottom />
    </div>
  );
};
UserHeader.propTypes = {
  user: PropTypes.object,
};
export default UserHeader;
