import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../common/logo";

import Slider from "./components/slider";
const Main = () => {
  const slider = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore",
    "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor ",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doei",
  ];
  return (
    <section className="main">
      <div className="container">
        <div className="main__container">
          <div className="main__box">
            <Logo size={true} />
            <Slider slider={slider} />
            <Link className="main__link btn" to="/login">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
