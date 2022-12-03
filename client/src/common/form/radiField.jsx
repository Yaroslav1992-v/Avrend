import React, { useState } from "react";
const RadioField = ({ name, onChange }) => {
  const [stayOn, setStayOn] = useState(false);
  const handleChange = ({ target }) => {
    setStayOn((prevState) => !prevState);
    target.value = stayOn;
    onChange(target);
  };
  return (
    <div className="form__radioBox">
      <input
        id={name}
        className="form__radio"
        type="checkbox"
        name={name}
        onChange={handleChange}
      />
      <label htmlFor={name}>Remember me</label>
    </div>
  );
};

export default RadioField;
