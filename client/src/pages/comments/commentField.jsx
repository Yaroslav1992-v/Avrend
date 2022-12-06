import React from "react";
import PropTypes from "prop-types";
const CommentField = ({ placeholder, name, onChange }) => {
  const handleChange = (e) => {
    const height = e.target.scrollHeight;
    if (height < 60) {
      e.target.style.height = height + "px";
    }
    onChange(e);
  };
  return (
    <textarea
      className="comments__field"
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
    />
  );
};
CommentField.propTypes = {
  name: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
export default CommentField;
