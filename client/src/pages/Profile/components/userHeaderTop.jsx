import React from "react";
import UserImage from "../../../common/ui/userImage";
const HeaderTop = () => {
  return (
    <div className="user__header-top">
      <div className="user__imgBox">
        <UserImage
          img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuS4q9gPpC3J0mYiARB4gNfrwx3QHNglobOpDduKih&s"
          size={94}
        />
      </div>
      <div className="user__data">
        <h2 className="user__name">Samuel Johanson</h2>
        <span className="user__occupation">Freelance Photographer</span>
        <span className="user__date">joined in Aug 2017</span>
      </div>
    </div>
  );
};

export default HeaderTop;
