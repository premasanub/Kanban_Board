import { useDroppable } from "@dnd-kit/core";

import TaskCard from "./TaskCard";

function TaskColumn({
  id,
  title,
  tasks,
  color,
  onEdit,
  onOpen,
}) {
  const {
    setNodeRef,
    isOver,
  } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-4 min-h-[500px] transition ${
        isOver
          ? "bg-blue-50 ring-2 ring-blue-500"
          : "bg-gray-100"
      }`}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${color}`}
          />

          <h2 className="font-bold text-gray-800">
            {title}
          </h2>
        </div>

        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-600">
          {tasks.length}
        </span>
      </div>

      {/* TASKS */}

      <div className="min-h-[420px]">
        {tasks.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-400 text-sm">
            Drop tasks here
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onOpen={onOpen}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TaskColumn;
