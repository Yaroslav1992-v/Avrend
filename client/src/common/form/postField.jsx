import React from "react";
import PropTypes from "prop-types";
import { FcAddImage } from "react-icons/fc";
const PostField = ({ img, error, name, onChange }) => {
  return (
    <div className="form__inputBox">
      <label htmlFor={name}>
        <div className="form__postUpload">
          {img && <img src={img} alt="postImage" />}
          <FcAddImage className="form__uploadIcon" />
        </div>
      </label>
      <input
        id={name}
        className="form__file"
        type="file"
        name={name}
        onChange={onChange}
      />{" "}
      {error && <p className="form_error">{error}</p>}
    </div>
  );
};
PostField.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
export default PostField;
