import React from "react";
import UserImage from "../../../common/ui/userImage";
import PropTypes from "prop-types";
import NavDots from "../../../common/ui/navDots";
import { transformDate } from "../../../utils/formatDate";
const PostHeader = ({ name, img, date, link }) => {
  const newDate = transformDate(date);
  return (
    <div className="post__header">
      <div className="post__header-left">
        <UserImage link={`/${link}`} size={40} img={img} />
        <div className="post__user">
          <h3 className="post__userName">{name}</h3>
          <span className="post__date">{newDate}</span>
        </div>
      </div>
      <NavDots />
    </div>
  );
};
PostHeader.propTypes = {
  link: PropTypes.string,
  name: PropTypes.string,
  img: PropTypes.string,
  date: PropTypes.string,
};
export default PostHeader;
