import React from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
const CommentField = ({ focus, placeholder, name, onChange, value }) => {
  const textRef = useRef();
  const handleChange = (e) => {
    onChange(e);
  };
  if (focus) {
    textRef.current.focus();
  }
  return (
    <textarea
      ref={textRef}
      className="comments__field"
      onChange={handleChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};
CommentField.propTypes = {
  name: PropTypes.string,
  focus: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default CommentField;
