import React, { useState } from "react";
import Logo from "../../common/logo";
import LoginForm from "../main/components/ui/loginForm";
import RegisterForm from "../main/components/ui/registerForm";
import { AiOutlineArrowLeft } from "react-icons/ai";
const Login = () => {
  const [type, setType] = useState("login");
  const handleType = () => {
    setType((prevState) => (prevState === "login" ? "register" : "login"));
  };
  return (
    <section className="login">
      <div className="container">
        <div className="login__container">
          <Logo size={false} />
          <div className="login__box">
            <h2 className="login__title">
              {type === "login" ? "Welcome back" : "Registration"}
            </h2>
            {type === "login" && (
              <p className="login__text">Sign in to continue</p>
            )}
            {type === "login" ? <LoginForm /> : <RegisterForm />}
            {type === "login" && (
              <div className="login__forgot">
                <h3 className="login__question">
                  Did you forgot your password?
                </h3>
                <a href="/" className="login__reset">
                  Reset here
                </a>
              </div>
            )}
            <button
              onClick={handleType}
              className={type === "login" ? "btn login__signUp" : "login__back"}
            >
              {type === "login" ? "Sign Up" : <AiOutlineArrowLeft />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
