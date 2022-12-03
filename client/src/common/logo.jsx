import React from "react";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";
const Logo = ({ size }) => {
  return (
    <div className={"logo" + (!size ? " logo-small" : "")}>
      <div
        className={"logo__imageBox " + (!size ? " logo__imageBox-small" : "")}
      >
        <img src={logo} alt="logo" className="logo__image" />
      </div>
      <div className="logo__info">
        <h1 className={"logo__title" + (!size ? " logo__title-small" : "")}>
          Avrend
        </h1>
        <p className={"logo__text" + (!size ? " logo__text-small" : "")}>
          Your advanture friends app
        </p>
      </div>
    </div>
  );
};
Logo.propTypes = {
  size: PropTypes.bool,
};
export default Logo;
