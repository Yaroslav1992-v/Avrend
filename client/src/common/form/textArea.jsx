import React from "react";
import PropTypes from "prop-types";
const TextArea = ({ name, placeholder, onChange }) => {
  return (
    <div className="form__text">
      <label htmlFor={name}></label>
      <textarea
        className="form__textArea"
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
TextArea.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
export default TextArea;
