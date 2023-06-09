import { useState } from "react";
import LoginUI from "../Components/Auth/LoginUI";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  return <LoginUI loginInfo={loginInfo} setLoginInfo={setLoginInfo} />;
};

export default Login;
