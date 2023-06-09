import { loginInfoType } from "../types/AuthType";

export const validateInput = (
  loginInfo: loginInfoType,
  setValidationErrors: React.Dispatch<React.SetStateAction<loginInfoType>>
) => {
  const errors: loginInfoType = {
    email: "",
    password: "",
  };

  if (!loginInfo.email) {
    errors.email = "Please enter an email address";
  } else if (!/\S+@\S+\.\S+/.test(loginInfo.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!loginInfo.password) {
    errors.password = "Please enter a password";
  } else if (loginInfo.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!/\d/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/[a-z]/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/[A-Z]/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/\W/.test(loginInfo.password)) {
    errors.password = "Password must contain at least one special character";
  }

  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};
