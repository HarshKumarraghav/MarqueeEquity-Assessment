import { useState } from "react";
import Modal from "react-modal";
import { useTodo } from "../../Context/TodoContext/TodoContext";
import { sanitizeInput } from "../../utils/Sanitize";
import {
  MdAdd,
  MdClose,
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

interface Todo {
  id: number;
  text: string;
  subtasks: Todo[];
  isDone: boolean;
}

interface TodoProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const { addSubtask, deleteSubtask, editSubtask } = useTodo();
  const [subtaskText, setSubtaskText] = useState("");
  const [showAddSubtaskModal, setShowAddSubtaskModal] = useState(false);
  const [showEditSubtaskModal, setShowEditSubtaskModal] = useState(false);
  const [selectedSubtask, setSelectedSubtask] = useState<Todo | null>(null);
  const [isSubtasksVisible, setIsSubtasksVisible] = useState(false);
  const handleAddSubtask = () => {
    setShowAddSubtaskModal(true);
  };

  const handleDeleteSubtask = (subtaskId: number) => {
    deleteSubtask(todo.id, subtaskId);
  };

  const handleEditSubtask = (subtaskId: number, subtaskText: string) => {
    setShowEditSubtaskModal(true);
    setSelectedSubtask({
      id: subtaskId,
      text: subtaskText,
      subtasks: [],
      isDone: false,
    });
  };

  const handleSaveSubtask = () => {
    const sanitizedText = sanitizeInput(subtaskText);
    if (sanitizedText.trim() !== "") {
      if (selectedSubtask) {
        editSubtask(todo.id, selectedSubtask.id, sanitizedText);
      } else {
        const newSubtask: Todo = {
          id: Date.now(),
          text: sanitizedText.trim(),
          subtasks: [],
          isDone: false,
        };
        addSubtask(todo.id, newSubtask);
      }
    }
    setSubtaskText("");
    setShowAddSubtaskModal(false);
    setShowEditSubtaskModal(false);
    setSelectedSubtask(null);
  };
  const toggleSubtasksVisibility = () => {
    setIsSubtasksVisible(!isSubtasksVisible);
  };
  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{todo.text}</h3>
        <button
          onClick={handleAddSubtask}
          className="bg-blue-500 text-white rounded px-2 py-2"
        >
          <MdAdd size={20} color="white" />
        </button>
      </div>

      {isSubtasksVisible && todo.subtasks.length > 0 && (
        <>
          {todo.subtasks.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center mb-2 bg-white rounded-lg p-3 shadow"
            >
              <p className="flex-grow">{subtask.text}</p>
              <button
                onClick={() => handleEditSubtask(subtask.id, subtask.text)}
                className="bg-yellow-500 text-white rounded px-2 py-2 ml-2"
              >
                <MdEdit size={20} color="white" />
              </button>
              <button
                onClick={() => handleDeleteSubtask(subtask.id)}
                className="bg-red-500 text-white rounded px-2 py-2 ml-2"
              >
                <MdDelete size={20} color="white" />
              </button>
            </div>
          ))}
        </>
      )}

      {todo.subtasks.length > 0 && (
        <button
          onClick={toggleSubtasksVisibility}
          className="flex items-center mt-2 text-gray-600 hover:text-gray-800"
        >
          {isSubtasksVisible ? (
            <>
              <MdKeyboardArrowUp size={20} /> Hide Subtasks
            </>
          ) : (
            <>
              <MdKeyboardArrowDown size={20} /> Show Subtasks
            </>
          )}
        </button>
      )}

      <Modal
        isOpen={showAddSubtaskModal || showEditSubtaskModal}
        onRequestClose={() => {
          setSubtaskText("");
          setShowAddSubtaskModal(false);
          setShowEditSubtaskModal(false);
          setSelectedSubtask(null);
        }}
        className="Modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        overlayClassName="Overlay"
      >
        <div className="relative bg-white rounded-lg p-8 max-w-md mx-auto">
          <button
            onClick={() => {
              setSubtaskText("");
              setShowAddSubtaskModal(false);
              setShowEditSubtaskModal(false);
              setSelectedSubtask(null);
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <MdClose color="black" size={20} />
          </button>
          <h2 className="text-lg font-semibold mb-4">
            {showEditSubtaskModal ? "Edit Subtask" : "Add Subtask"}
          </h2>
          <div className="flex flex-col gap-y-3 ">
            <input
              type="text"
              placeholder="Enter subtask"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 mb-4"
            />
            <button
              onClick={handleSaveSubtask}
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <div className="p-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
