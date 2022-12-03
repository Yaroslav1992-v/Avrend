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
    <div className="main__slider">
      <div className="main__textBox">
        <p>{slider[slide]}</p>
      </div>
      <ul className="main__dots">
        {slider.map((dot, index) => (
          <li className="main__dots-item" key={index}>
            <button
              type="button"
              onClick={() => handleSlide(index)}
              className={
                "main__dot" + (slide === index ? " main__dot-active" : "")
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
