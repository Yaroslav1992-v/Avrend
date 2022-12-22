import React from "react";
import { Link } from "react-router-dom";
import menuPic from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
const Menu = ({ check, toggleMenu }) => {
  const menu = [
    { name: "home", location: "/" },
    { name: "chats", location: "/chats" },
    { name: "notifications", location: "/notifications" },
    { name: "settings", location: "/settings" },
  ];
  return (
    <div className={"menu" + (check ? " menu-active" : "")}>
      <div className="menu__background">
        <img src={menuPic} alt="menubackground" />
      </div>
      <div className="menu__inner">
        <h3 className="menu__title">Avrend</h3>
        <button className="menu__close" onClick={toggleMenu}></button>
        <div className="menu__logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <h4 className="menu__name">Menu</h4>
      <ul className="menu__list">
        {menu.map((item, index) => (
          <li key={index} className="menu__item">
            <Link to={item.location} className="menu__link">
              {item.name}
            </Link>
          </li>
        ))}
        <li className="menu__item">
          <Link className="menu__link">Log Out</Link>
        </li>
      </ul>
    </div>
  );
};
Menu.propTypes = {
  check: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

export default Menu;
