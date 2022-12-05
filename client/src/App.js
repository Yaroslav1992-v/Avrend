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
import EditUser from "./pages/edit/editUser";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <div className="App">
      <AppLoader>
        <Routes>
          <Route path="/users/:userId">
            <Route index element={<UserProfile />} />
            <Route path="edit" element={<EditUser />} />
          </Route>
          {!isLoggedIn && <Route path="/login" element={<Login />}></Route>}
          <Route path="*" element={isLoggedIn ? <Home /> : <Start />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Start />}></Route>
        </Routes>
      </AppLoader>
    </div>
  );
}

export default App;
