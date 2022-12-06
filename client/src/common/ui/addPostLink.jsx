import React from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
const AddPostLink = () => {
  return (
    <Link className="addPostLink" to="/addPost">
      <AiOutlinePlus />
    </Link>
  );
};

export default AddPostLink;
