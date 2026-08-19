import { useState } from "react";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useTasks } from "../context/TaskContext";

function TaskModal({ task, onClose }) {
  const { updateTask, deleteTask } = useTasks();

  const [description, setDescription] = useState(
    task.description
  );

  const [status, setStatus] = useState(task.status);

  const [priority, setPriority] = useState(task.priority);

  const handleSave = () => {
    updateTask(task.id, {
      description,
      status,
      priority,
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task?")) {
      deleteTask(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              Task Details
            </p>

            <h2 className="text-2xl font-bold text-gray-800">
              {task.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="mt-6">
          <label className="block font-medium text-sm mb-2">
            Description
          </label>

          <textarea
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="block font-medium text-sm mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-2">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border rounded-lg px-3 py-2.5"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {task.tags?.length > 0 && (
          <div className="mt-5">
            <p className="font-medium text-sm mb-2">Tags</p>

            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {task.deadline && (
          <div className="mt-5">
            <p className="text-sm text-gray-500">
              Deadline
            </p>

            <p className="font-medium">
              {task.deadline}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mt-7">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
            Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;