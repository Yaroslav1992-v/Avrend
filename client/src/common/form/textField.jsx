import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const TextField = ({
  value,
  type = "text",
  name,
  placeholder,
  onChange,
  error,
}) => {
  const [inputType, setInputType] = useState(true);
  const handleType = (e) => {
    e.preventDefault();
    setInputType((prevState) => !prevState);
  };
  const handleChange = ({ target }) => {
    onChange(target);
  };

  return (
    <div className="form__inputBox">
      <label htmlFor={name}></label>
      <input
        className="form__input"
        type={inputType ? type : "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {type === "password" && (
        <button className="form__btn" onClick={handleType}>
          {inputType ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      )}
      {error && <p className="form_error">{error}</p>}
    </div>
  );
};
TextField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
export default TextField;
