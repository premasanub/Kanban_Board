import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
} from "react-icons/fi";

import { useTasks } from "../Context/TaskContext";

function TaskCard({ task, onEdit, onOpen }) {
  const { deleteTask } = useTasks();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priorityStyle = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onEdit(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-200 transition ${
        isDragging
          ? "opacity-40 shadow-2xl"
          : "hover:shadow-md"
      }`}
    >
      {/* DRAG AREA */}
      <div
        {...listeners}
        {...attributes}
        onClick={() => onOpen(task)}
        className="cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between items-start gap-3">
          <h3 className="font-semibold text-gray-800">
            {task.title}
          </h3>

          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              priorityStyle[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {task.description}
        </p>

        {task.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {task.deadline && (
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-3">
            <FiCalendar />
            {task.deadline}
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleEdit}
          className="p-2 rounded-lg text-blue-500 hover:bg-blue-50"
        >
          <FiEdit2 />
        </button>

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleDelete}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;