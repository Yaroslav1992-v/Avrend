import React from "react";
import Logo from "../logo";
const Loader = () => {
  return (
    <section className="startPage">
      <div className="container">
        <div className="startPage__container">
          <div className="startPage__box">
            <Logo size={true} />
            <div className="loader-container">
              <div className="wrapper">
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
                <div className="loader">
                  <div className="spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loader;
