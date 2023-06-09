import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { TodoProvider } from "./Context/TodoContext/TodoContext";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <TodoProvider>
            <Dashboard />
          </TodoProvider>
        }
      />
    </Routes>
  );
}

export default App;
