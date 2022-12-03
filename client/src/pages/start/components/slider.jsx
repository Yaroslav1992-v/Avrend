import React, { useState } from "react";
import PropTypes from "prop-types";

const Slider = ({ slider }) => {
  const [slide, setSlide] = useState(0);
  const handleSlide = (index) => {
    setSlide(index);
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setSlide((prevState) =>
  //       prevState === slider.length - 1 ? 0 : (prevState += 1)
  //     );
  //   }, 3000);
  // }, [slide]);

  return (
    <div className="startPage__slider">
      <div className="startPage__textBox">
        <p>{slider[slide]}</p>
      </div>
      <ul className="startPage__dots">
        {slider.map((dot, index) => (
          <li className="startPage__dots-item" key={index}>
            <button
              type="button"
              onClick={() => handleSlide(index)}
              className={
                "startPage__dot" +
                (slide === index ? " startPage__dot-active" : "")
              }
            ></button>
          </li>
        ))}
      </ul>
      ;
    </div>
  );
};
Slider.propTypes = {
  slider: PropTypes.array.isRequired,
};
export default Slider;
