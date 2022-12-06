export const getFullName = (firstName, lastName) => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  if (firstName && !lastName) {
    return firstName;
  } else if (!firstName && lastName) {
    return lastName;
  }
  return "";
};
