import { useTodo } from "../Context/TodoContext/TodoContext";
import Todo from "../Components/Todo/Todo";
import TodoList from "../Components/Todo/TodoList";

import Navbar from "../Components/Header/Navbar";

const Dashboard = () => {
  const { addTodo } = useTodo();
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Todo App</h1>
          <Todo addTodo={addTodo} />
          <TodoList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
