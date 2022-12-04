import React from "react";
import { Link } from "react-router-dom";
import HeaderBottom from "./components/userHeaderBottom";
import HeaderTop from "./components/userHeaderTop";
const UserHeader = () => {
  return (
    <div className="user__header">
      <HeaderTop />
      <div className="user__edit">
        <Link to="/edit" className="user__edit-link">
          Edit Profile
        </Link>
      </div>

      <HeaderBottom />
    </div>
  );
};

export default UserHeader;
