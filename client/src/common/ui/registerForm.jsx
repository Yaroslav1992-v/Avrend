import React, { useState } from "react";
import RadioField from "../form/radiField";
import TextField from "../form/textField";
import { validator } from "../../utils/validator";
import { registerValidator } from "../../utils/validatorsConfig";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, signUp } from "../../store/user";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";
const RegisterForm = () => {
  const [user, setUser] = useState({
    email: "",
    accountName: "",
    password: "",
    remember: "",
  });
  const [loading, setLoading] = useState(false);
  const backEndError = useSelector(getAuthError());
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const validate = () => {
    const errors = validator(user, registerValidator);
    setErrors(errors);
  };
  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    validate();
    if (Object.keys(errors).length > 0) {
      return;
    }
    const register = await dispatch(signUp(user));
    if (register) {
      navigate("/");
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        placeholder="Account Name"
        onChange={handleChange}
        name="accountName"
        value={user.accountName}
        error={errors.accountName}
      />

      <TextField
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={user.email}
        type="email"
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
      <RadioField name="remember" onChange={handleChange} />
      {backEndError && <p className="form_error">{backEndError}</p>}
      <button className="form__submit btn">
        {loading && <Loader />}Register
      </button>
    </form>
  );
};

export default RegisterForm;
