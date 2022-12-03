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
      message: "Name must contain  at least 5 symbols",
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
