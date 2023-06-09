import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  subtasks: Todo[];
  isDone: boolean;
}
interface TodoProps {
  addTodo: (todo: Todo) => void;
}

const Todo: React.FC<TodoProps> = ({ addTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleAddTodo = () => {
    if (todoText.trim() === "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText.trim(),
      subtasks: [],
      isDone: false,
    };

    addTodo(newTodo);
    setTodoText("");
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a new Todo"
        className="border border-gray-300 rounded px-2 py-1 mr-2"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white rounded px-4 py-1"
      >
        Add Todo
      </button>
    </div>
  );
};

export default Todo;
