import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { TodoProvider } from "./Context/TodoContext/TodoContext";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectRoute/ProtectRoute";
function App() {
  const Router = useNavigate();
  const userInfo = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "Qwerty@123",
  };
  useEffect(() => {
    localStorage.setItem("user_check", JSON.stringify(userInfo));
  }, []);
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
    if (isUserLoggedIn === "false" || isUserLoggedIn === null) {
      Router("/");
    } else {
      Router("/home");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <TodoProvider>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </TodoProvider>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="w-screen h-screen flex justify-center items-center flex-col">
              <img
                src="/src/assets/oops404.jpg"
                alt=""
                width={500}
                height={500}
              />
              <button
                className="bg-btncolor text-white px-4 py-2 shadow-lg rounded-md hover:scale-105 transition-all ease-out"
                onClick={() => Router("/")}
              >
                Go to home
              </button>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
