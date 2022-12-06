import React from "react";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
const ShareLink = () => {
  return (
    <Link to="posts/:id/share" className="action">
      <button className="action__btn">
        <FaShare className="action__svg" />
      </button>
      <span className="action__amount" to="posts/:id/share">
        Share
      </span>
    </Link>
  );
};

export default ShareLink;
