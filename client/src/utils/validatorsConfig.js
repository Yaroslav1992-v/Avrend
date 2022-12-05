export const loginValidator = {
  email: {
    isRequired: { message: "Email is Required To Login " },
  },
  password: {
    isRequired: { message: "Password is Required to Login " },
  },
};
export const registerValidator = {
  email: {
    isRequired: { message: "Email is Required For Registration " },
    isEmail: { message: "Invalid Email " },
  },
  accountName: {
    isRequired: { message: "Name is Required For Registration " },
    min: {
      message: "account name must contain  at least 5 symbols",
      value: 5,
    },
  },

  password: {
    isRequired: { message: "Password is Required For Registration " },
    isCapitalSymbol: {
      message: "Password Must Have One Capital Symbol",
    },

    isContainDigit: {
      message: "Password Must At Least One Digit",
    },
    min: {
      message: "Password Must Contain At Least 8 Symbols",
      value: 8,
    },
  },
};
export const editValidator = {
  accountName: {
    isRequired: { message: "Name is Required For Registration " },
    min: {
      message: "account name must contain  at least 5 symbols",
      value: 5,
    },
    max: {
      message: "account name lengtn cant be more than 20 symbols",
      value: 20,
    },
  },
  lastName: {
    isRequired: { message: "Name is Required For Registration " },
    max: {
      message: "last Name lengtn cant be more than 20 symbols",
      value: 20,
    },
  },
  firstName: {
    isRequired: { message: "Name is Required For Registration " },
    max: {
      message: "first name lengtn cant be more than 20 symbols",
      value: 20,
    },
  },
};
