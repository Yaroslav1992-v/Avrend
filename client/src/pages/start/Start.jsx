import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../common/logo";

import Slider from "./components/slider";
const Start = () => {
  const slider = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore",
    "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doei",
  ];
  return (
    <section className="startPage">
      <div className="container">
        <div className="startPage__container">
          <div className="startPage__box">
            <Logo size={true} />
            <Slider slider={slider} />
            <Link className="startPage__link btn" to="/login">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
