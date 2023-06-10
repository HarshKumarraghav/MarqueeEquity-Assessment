import { useEffect, useState } from "react";
import { loginInfoType } from "../../types/AuthType";
import { validateInput } from "../../utils/LoginValidator";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../Context/userContext";
type Props = {
  loginInfo: loginInfoType;
  setLoginInfo: (loginInfo: loginInfoType) => void;
};

const LoginUI = ({ loginInfo, setLoginInfo }: Props) => {
  const { user } = useUserAuth();
  const Router = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
used to update the `isButtonDisabled` state based on the `loginInfo` state. The function passed to
`useEffect` will be called whenever `loginInfo` changes. It sets the `isButtonDisabled` state to
`true` if either the `email` or `password` property of `loginInfo` is falsy (empty or undefined),
and `false` otherwise. This is used to disable the login button if either the email or password is
missing or invalid. */
  useEffect(() => {
    setIsButtonDisabled(!loginInfo.email || !loginInfo.password);
  }, [loginInfo]);

  /**
   * This function handles form submission for user login and checks if the login information is valid
   * and matches the stored user information in local storage.
   * @param {any} e - The parameter `e` is an event object that is passed to the `handleSubmit`
   * function. It is used to prevent the default behavior of a form submission, which is to reload the
   * page.
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = localStorage.getItem("user_check");
    const userInfo = user ? JSON.parse(user) : null;
    const inValidUser = validateInput(loginInfo, setValidationErrors);
    if (inValidUser === false) {
      if (
        userInfo?.email === loginInfo.email &&
        userInfo?.password === loginInfo.password
      ) {
        localStorage.setItem("isUserLoggedIn", "true");
        Router("/home");
      } else {
        localStorage.setItem("isUserLoggedIn", "false");
        alert("user not found! ");
      }
    }
  };
  console.log("user", user);
  /* This is the UI component for the login page. It contains a form with two input fields for email and
 password, and a submit button. The component also includes state variables for `isButtonDisabled`
 and `validationErrors`, which are used to disable the submit button if the email or password fields
 are empty or invalid, and to display validation error messages if there are any. The `useEffect`
 hook is used to update the `isButtonDisabled` state whenever the `loginInfo` state changes. The
 `handleSubmit` function is called when the form is submitted, and it checks if the login
 information is valid and matches the stored user information in local storage. If the login is
 successful, the user is redirected to the home page. */
  return (
    <section className="w-screen h-screen flex justify-center items-center backgroundImage">
      <main className="w-4/5 h-3/5 lg:h-3/4 md:w-2/3 lg:w-1/3 flex justify-center items-center flex-col  backgroundprop">
        <img
          src="../../../src/assets/MELogo.svg"
          alt="company logo"
          className="w-6/12 mb-10"
        />

        <h1 className="text-2xl font-semibold text-center text-white ">
          Welcome back!
        </h1>

        <h2 className="text-xl font-medium text-center text-white mb-10">
          Please enter your credentials to login.
        </h2>

        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-between items-center w-full gap-y-7">
            <div className="flex flex-col w-full items-center">
              <input
                type="email"
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
                placeholder="Enter your email"
                className="w-4/5 h-12 px-5 rounded-lg shadow-md outline-btncolor text-gray-600"
              />
              {validationErrors.email && (
                <span className="text-red-500">{validationErrors.email}</span>
              )}
            </div>
            <div className="flex flex-col w-full items-center">
              <input
                type="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                placeholder="Enter your password"
                className="w-4/5 h-12 px-5 rounded-lg shadow-md outline-btncolor text-gray-600"
              />
              {validationErrors.password && (
                <span className="text-red-500">
                  {validationErrors.password}
                </span>
              )}
            </div>

            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`w-4/5 h-12 mb-5 rounded-lg shadow-light-shadow outline-none bg-btncolor text-white font-bold ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Login
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default LoginUI;
