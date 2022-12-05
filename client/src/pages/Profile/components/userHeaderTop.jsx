import React from "react";
import UserImage from "../../../common/ui/userImage";
import PropTypes from "prop-types";
import { formatDate } from "../../../utils/formatDate";
const HeaderTop = ({
  picturePath,
  firstName,
  lastName,
  occupation,
  createdAt,
}) => {
  const getFullName = () => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    if (firstName && !lastName) {
      return firstName;
    } else if (!firstName && lastName) {
      return lastName;
    }
    return "";
  };
  const fullName = getFullName();
  return (
    <div className="user__header-top">
      <div className="user__imgBox">
        <UserImage img={picturePath ? picturePath : null} size={94} />
      </div>
      <div className="user__data">
        {fullName && <h2 className="user__name">{fullName}</h2>}
        <span className="user__occupation">{occupation}</span>
        <span className="user__date">
          joined in {" " + formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};
HeaderTop.propTypes = {
  name: PropTypes.string,
  picturePath: PropTypes.string,
  occupation: PropTypes.string,
  createdAt: PropTypes.string,
};
export default HeaderTop;
