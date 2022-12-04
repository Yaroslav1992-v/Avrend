import React from "react";
const HeaderBottom = () => {
  return (
    <ul className="user__header-bottom">
      <li className="user__header-item">
        <p className="user__header-key">Post</p>
        <p className="user__header-number">52</p>
      </li>
      <li className="user__header-item">
        <p className="user__header-key">Following</p>
        <p className="user__header-number">250</p>
      </li>
      <li className="user__header-item">
        <p className="user__header-key">Followers</p>
        <p className="user__header-number">4.5K</p>
      </li>
    </ul>
  );
};

export default HeaderBottom;
