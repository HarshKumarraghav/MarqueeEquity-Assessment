import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const Router = useNavigate();
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (isUserLoggedIn === "false" || isUserLoggedIn === null) {
      Router("/");
    }
  }, []);
  return <>{children}</>;
};

export default ProtectedRoute;
