
import { useState } from "react";

import {
  DndContext,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";

import { FiPlus, FiClipboard } from "react-icons/fi";

import { useTasks } from "./Context/TaskContext";

import TaskColumn from "./Components/TaskColumn";
import TaskCard from "./Components/TaskCard";
import AddTaskModal from "./Components/AddTaskModal";
import TaskModal from "./Components/TaskModal";

function App() {
  const {
    tasks,
    moveTask,
  } = useTasks();

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [activeTask, setActiveTask] =
    useState(null);

  // -----------------------------
  // FILTER TASKS
  // -----------------------------

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  // -----------------------------
  // FIND TASK
  // -----------------------------

  const findTask = (id) => {
    return tasks.find(
      (task) => String(task.id) === String(id)
    );
  };

  // -----------------------------
  // DRAG START
  // -----------------------------

  const handleDragStart = (event) => {
    const task = findTask(event.active.id);

    console.log("DRAG START:", task);

    setActiveTask(task);
  };

  // -----------------------------
  // DRAG END
  // -----------------------------

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("DRAG END");
    console.log("ACTIVE:", active.id);
    console.log("OVER:", over?.id);

    setActiveTask(null);

    if (!over) {
      console.log("Nothing dropped");
      return;
    }

    const task = findTask(active.id);

    if (!task) {
      console.log("Task not found");
      return;
    }

    let newStatus = null;

    // Dropped directly on column
    if (over.id === "todo") {
      newStatus = "todo";
    }

    if (over.id === "progress") {
      newStatus = "progress";
    }

    if (over.id === "done") {
      newStatus = "done";
    }

    // Dropped on another task
    if (!newStatus) {
      const overTask = findTask(over.id);

      if (overTask) {
        newStatus = overTask.status;
      }
    }

    console.log("NEW STATUS:", newStatus);

    if (!newStatus) {
      return;
    }

    if (task.status === newStatus) {
      return;
    }

    moveTask(task.id, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-xl">
                <FiClipboard size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Kanban Board
                </h1>

                <p className="text-sm text-gray-500">
                  Manage your tasks efficiently
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingTask(null);
                setShowAddModal(true);
              }}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              <FiPlus />
              Add Task
            </button>
          </div>
        </div>
      </header>

      {/* BOARD */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* TODO */}

            <TaskColumn
              id="todo"
              title="To Do"
              color="bg-gray-500"
              tasks={todoTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowAddModal(true);
              }}
              onOpen={(task) => {
                setSelectedTask(task);
              }}
            />

            {/* PROGRESS */}

            <TaskColumn
              id="progress"
              title="In Progress"
              color="bg-blue-500"
              tasks={progressTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowAddModal(true);
              }}
              onOpen={(task) => {
                setSelectedTask(task);
              }}
            />

            {/* DONE */}

            <TaskColumn
              id="done"
              title="Done"
              color="bg-green-500"
              tasks={doneTasks}
              onEdit={(task) => {
                setEditingTask(task);
                setShowAddModal(true);
              }}
              onOpen={(task) => {
                setSelectedTask(task);
              }}
            />

          </div>

          {/* DRAG OVERLAY */}

          <DragOverlay>
            {activeTask ? (
              <div className="w-[350px]">
                <TaskCard
                  task={activeTask}
                  onEdit={() => {}}
                  onOpen={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>

        </DndContext>
      </main>

      {/* ADD / EDIT */}

      {showAddModal && (
        <AddTaskModal
          editTask={editingTask}
          onClose={() => {
            setShowAddModal(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* DETAILS */}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;