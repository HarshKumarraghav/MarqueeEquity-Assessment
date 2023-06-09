import { useTodo } from "../Context/TodoContext/TodoContext";
import Todo from "../Components/Todo/Todo";
import TodoList from "../Components/Todo/TodoList";

const Dashboard = () => {
  const { addTodo } = useTodo();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <Todo addTodo={addTodo} />
      <TodoList />
    </div>
  );
};

export default Dashboard;
