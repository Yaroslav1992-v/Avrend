import React, { useEffect } from "react";

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
import AddPost from "./pages/addPost/addPost";
import Posts from "./pages/posts/posts";
import Comments from "./pages/comments/comments";

import ChatLoader from "./common/ui/hoc/chatLoader";
import Notifications from "./pages/notification/notifications";

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <div className="App">
      {isLoggedIn ? (
        <AppLoader>
          <Routes>
            {" "}
            <Route path="/:userId">
              <Route index element={<UserProfile />} />
              <Route path="edit" element={<EditUser />} />
              <Route path="addPost" element={<AddPost />} />
              <Route path="posts" element={<Posts />} />
            </Route>{" "}
            <Route path="notifications" element={<Notifications />} />
            <Route path="p/:postId/comments" element={<Comments />} />
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />}></Route>{" "}
            <Route path="/chats/*" element={<ChatLoader />} />
          </Routes>
        </AppLoader>
      ) : (
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<Start />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
