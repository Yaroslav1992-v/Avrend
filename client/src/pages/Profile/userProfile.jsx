import React from "react";
import NavBar from "../../common/ui/navBar";
import NavDots from "../../common/ui/navDots";
import UserContent from "./components/userContent";

import UserHeader from "./userHeader";
const UserProfile = () => {
  return (
    <section className="user">
      <div className="container">
        <div className="user__container">
          <NavBar check={true} children={<NavDots />} title="Profile" />
          <UserHeader />
          <UserContent />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
