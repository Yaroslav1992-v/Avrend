import React from "react";
import { FcLike } from "react-icons/fc";
import { AiTwotoneHeart } from "react-icons/ai";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const LikeLink = ({ amount }) => {
  return (
    <div className="action">
      <button className="action__btn">
        <AiTwotoneHeart className="action__notLiked" />
      </button>
      <Link className="action__amount" to="posts/:id/likes">
        {amount}
      </Link>
    </div>
  );
};
LikeLink.propTypes = {
  amount: PropTypes.number,
};
export default LikeLink;
