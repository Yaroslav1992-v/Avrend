import React, { useState } from "react";
import PropTypes from "prop-types";
import Menu from "./Menu";

const NavBar = ({ title, children, check }) => {
  const [open, setOpen] = useState(true);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <nav className={"navigation" + (check ? " navigation-between" : "")}>
      <button className="navigation__btn" onClick={toggleMenu}></button>
      {title && <h1 className="navigation__title">{title}</h1>}
      {children}
      <Menu check={open} toggleMenu={toggleMenu} />
    </nav>
  );
};
NavBar.defaultProps = {
  title: "",
};
NavBar.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  check: PropTypes.bool,
};
export default NavBar;
