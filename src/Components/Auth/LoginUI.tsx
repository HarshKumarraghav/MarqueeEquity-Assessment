import React, { useEffect, useState } from "react";
import { loginInfoType } from "../../types/AuthType";
import { validateInput } from "../../utils/LoginValidator";

type Props = {
  loginInfo: loginInfoType;
  setLoginInfo: (loginInfo: loginInfoType) => void;
};

const LoginUI = ({ loginInfo, setLoginInfo }: Props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsButtonDisabled(!loginInfo.email || !loginInfo.password);
  }, [loginInfo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateInput(loginInfo, setValidationErrors)) {
      console.log("Valid input");
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center backgroundImage">
      <main className="w-4/5 h-2/4 lg:h-3/4 md:w-1/2 lg:w-1/3 flex justify-center items-center flex-col  backgroundprop">
        <img
          src="../../../src/assets/ME-Logo.svg"
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
                className="w-4/5 h-12 px-5 rounded-lg shadow-md outline-none"
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
                className="w-4/5 h-12 px-5 rounded-lg shadow-md outline-none"
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
