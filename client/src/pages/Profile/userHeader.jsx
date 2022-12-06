import React from "react";
import { Link, useParams } from "react-router-dom";
import HeaderBottom from "./components/userHeaderBottom";
import HeaderTop from "./components/userHeaderTop";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/user";
const UserHeader = ({ user }) => {
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUserId());

  return (
    <div className="user__header">
      <HeaderTop {...user} />
      <div className="user__actions">
        {userId === currentUser && (
          <>
            <Link to="edit" className="user__action-link">
              Edit Profile
            </Link>
            <Link to="addPost" className="user__action-link">
              Add post
            </Link>
          </>
        )}
      </div>
      <HeaderBottom />
    </div>
  );
};
UserHeader.propTypes = {
  user: PropTypes.object,
};
export default UserHeader;
