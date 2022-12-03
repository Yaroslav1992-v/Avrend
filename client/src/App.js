import React from "react";
import Main from "./pages/main/Main";
import "./style/index.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
