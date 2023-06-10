import { createContext, useState, useEffect, useContext } from "react";

interface Todo {
  id: number;
  text: string;
  subtasks: Todo[];
  isDone: boolean;
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  addSubtask: (todoId: number, subtask: Todo) => void;
  deleteTodo: (todoId: number) => void;
  deleteSubtask: (todoId: number, subtaskId: number) => void;
  editTodo: (todoId: number, newText: string) => void;
  editSubtask: (todoId: number, subtaskId: number, newText: string) => void;
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  addSubtask: () => {},
  deleteTodo: () => {},
  deleteSubtask: () => {},
  editTodo: () => {},
  editSubtask: () => {},
});

export const TodoProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const addSubtask = (todoId: number, subtask: Todo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          subtasks: [...todo.subtasks, subtask],
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const deleteSubtask = (todoId: number, subtaskId: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedSubtasks = todo.subtasks.filter(
          (subtask) => subtask.id !== subtaskId
        );
        return {
          ...todo,
          subtasks: updatedSubtasks,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const editTodo = (todoId: number, newText: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          text: newText,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const editSubtask = (todoId: number, subtaskId: number, newText: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const updatedSubtasks = todo.subtasks.map((subtask) => {
          if (subtask.id === subtaskId) {
            return {
              ...subtask,
              text: newText,
            };
          }
          return subtask;
        });

        return {
          ...todo,
          subtasks: updatedSubtasks,
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        addSubtask,
        deleteTodo,
        deleteSubtask,
        editTodo,
        editSubtask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextProps => {
  return useContext(TodoContext);
};
