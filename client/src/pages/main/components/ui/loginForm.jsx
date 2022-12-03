import React, { useState } from "react";
import TextField from "../../../../common/form/textField";
import RadioField from "../../../../common/form/radiField";
import { validator } from "../../../../utils/validator";
import { loginValidator } from "../../../../utils/validatorsConfig";
const LoginForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember: "",
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
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
      <RadioField name="remember" onChange={handleChange} />
      <button className="form__submit btn">Sign In</button>
    </form>
  );
};

export default LoginForm;
