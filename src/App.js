import React, { useState, useCallback, useMemo } from "react";
import { TaskProvider, useTasks } from "./contexts/TaskContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

// ✅ Correct import paths - make sure these files exist
import TaskForm from "./components/TaskForm/TaskForm";
import FilterButtons from "./components/FilterButton/FilterButton";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import DragAndDropWrapper from "./components/DragAndDropWrapper/DragAndDropWrapper";

import "./styles/themes.css";

const TaskManager = () => {
  const { tasks, reorderTasks } = useTasks();
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      if (result.source.index === result.destination.index) return;

      reorderTasks(result.source.index, result.destination.index);
    },
    [reorderTasks]
  );

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="container">
        <header className="header">
          <h1>Task Manager</h1>
          <ThemeToggle />
        </header>

        <TaskForm />

        {tasks.length > 0 && (
          <>
            <div className="stats">
              <span>Total: {tasks.length}</span>
              <span>Active: {tasks.filter((t) => !t.completed).length}</span>
              <span>Completed: {tasks.filter((t) => t.completed).length}</span>
            </div>

            <FilterButtons
              currentFilter={filter}
              onFilterChange={handleFilterChange}
            />
          </>
        )}

        <div className="tasks-container">
          {filteredTasks.length > 0 ? (
            <DragAndDropWrapper
              tasks={filteredTasks}
              onDragEnd={handleDragEnd}
            />
          ) : (
            <div className="empty-state">
              {tasks.length === 0
                ? "No tasks yet. Add one above!"
                : "No tasks match the current filter"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  </ThemeProvider>
);

// ✅ Make sure to export as default
export default App;
