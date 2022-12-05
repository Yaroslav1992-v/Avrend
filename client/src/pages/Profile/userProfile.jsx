import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../../common/ui/navBar";
import NavDots from "../../common/ui/navDots";
import { findUserById } from "../../store/user";
import UserContent from "./components/userContent";
import UserHeader from "./userHeader";
const UserProfile = () => {
  const { userId } = useParams();
  const user = useSelector(findUserById(userId));
  return (
    <section className="user">
      <div className="container">
        <div className="user__container">
          <NavBar check={true} children={<NavDots />} title="Profile" />
          <UserHeader user={user} />
          <UserContent />
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
