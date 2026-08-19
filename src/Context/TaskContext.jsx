import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

const defaultTasks = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create the homepage UI using Tailwind CSS.",
    status: "todo",
    priority: "High",
    tags: ["Design", "Frontend"],
    deadline: "2026-08-25",
  },
  {
    id: "2",
    title: "Create Login Page",
    description: "Build login and registration screens.",
    status: "progress",
    priority: "Medium",
    tags: ["React"],
    deadline: "2026-08-27",
  },
  {
    id: "3",
    title: "Setup Project",
    description: "Initialize React project and install dependencies.",
    status: "done",
    priority: "Low",
    tags: ["Setup"],
    deadline: "2026-08-20",
  },
];

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban_tasks");

    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      {
        ...task,
        id: Date.now().toString(),
      },
    ]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};


// const useTasks = () => {
//   return useContext(TaskContext);
// };
// export default useTasks;

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside TaskProvider"
    );
  }

  return context;
};