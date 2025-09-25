import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (text) => {
    if (text.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const updateTaskText = (taskId, newText) => {
    if (newText.trim() === "") return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const reorderTasks = (fromIndex, toIndex) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      const [movedTask] = newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, movedTask);
      return newTasks;
    });
  };

  const value = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTaskText,
    reorderTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
