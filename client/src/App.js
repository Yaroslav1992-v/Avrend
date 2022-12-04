import React from "react";

import "./style/index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Start from "./pages/start/Start";
import Home from "./pages/home/home";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/user";
import AppLoader from "./common/ui/hoc/appLoader";
import UserProfile from "./pages/Profile/userProfile";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <div className="App">
      <AppLoader>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Start />}></Route>
          <Route path="/users/:userId" element={<UserProfile />} />
          {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
          <Route path="*" element={isLoggedIn ? <Home /> : <Start />} />
        </Routes>
      </AppLoader>
    </div>
  );
}

export default App;
