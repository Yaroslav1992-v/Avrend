import React, { useState } from "react";
import TextField from "../form/textField";
import RadioField from "../form/radiField";
import { validator } from "../../utils/validator";
import { loginValidator } from "../../utils/validatorsConfig";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, signIn } from "../../store/user";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: "",
  });
  const [loading, setLoading] = useState(false);
  const backEndError = useSelector(getAuthError());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = validator(user, loginValidator);
    setErrors(errors);
  };
  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    validate();
    if (Object.keys(errors).length > 0) {
      return;
    }
    const login = await dispatch(signIn(user));
    if (login) {
      navigate("/");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={user.email}
        error={errors.email}
      />

      <TextField
        placeholder="Password"
        onChange={handleChange}
        name="password"
        value={user.password}
        type="password"
        error={errors.password}
      />
      {backEndError && <p className="form_error">{backEndError}</p>}
      <RadioField name="remember" onChange={handleChange} />
      <button className="form__submit btn">
        {loading && <Loader />}Sign In
      </button>
    </form>
  );
};

export default LoginForm;
