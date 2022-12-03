import React, { useState } from "react";
import RadioField from "../../../../common/form/radiField";
import TextField from "../../../../common/form/textField";
import { validator } from "../../../../utils/validator";
import { registerValidator } from "../../../../utils/validatorsConfig";
const RegisterForm = () => {
  const [user, setUser] = useState({
    email: "",
    accountName: "",
    password: "",
    remember: "",
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
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
      <button className="form__submit btn">Register</button>
    </form>
  );
};

export default RegisterForm;
