import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const UserImage = ({ size, link, img }) => {
  if (link) {
    return (
      <Link
        style={{ height: size, width: size }}
        className="user__profileImg"
        to={link}
      >
        {img && <img src={img} alt="ProfilePic" />}
      </Link>
    );
  }
  return (
    <div style={{ height: size, width: size }} className="user__profileImg">
      {img && <img src={img} alt="ProfilePic" />}
    </div>
  );
};
UserImage.propTypes = {
  size: PropTypes.number,
  link: PropTypes.string,
  img: PropTypes.string,
};
export default UserImage;
