import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserProfile from "../pages/Profile/userProfile";
import { getIsLoggedIn } from "../store/user";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login");
  } else {
    return (
      <Routes>
        <Route exact path="/users/:userId" element={<UserProfile />} />
      </Routes>
    );
  }
};

export default ProtectedRoutes;
