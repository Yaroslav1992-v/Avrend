import React from "react";
import PropTypes from "prop-types";
import UserImage from "../ui/userImage";
import { AiFillPlusCircle } from "react-icons/ai";
const FileField = ({ img, error, preview, name, value, onChange }) => {
  return (
    <div className="form__inputBox">
      <label className="form__fileUpload" htmlFor={name}>
        <UserImage img={preview || img} size={100} />
        <AiFillPlusCircle />
      </label>
      <input
        id={name}
        className="form__file"
        type="file"
        name={name}
        value={value}
        onChange={onChange}
      />{" "}
      {error && <p className="form_error">{error}</p>}
    </div>
  );
};
FileField.propTypes = {
  value: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
export default FileField;
