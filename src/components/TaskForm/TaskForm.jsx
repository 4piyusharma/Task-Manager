import React, { useState, useCallback } from "react";
import { useTasks } from "../../contexts/TaskContext";
import "./TaskForm.css";

const TaskForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (inputValue.trim()) {
        addTask(inputValue);
        setInputValue("");
      }
    },
    [inputValue, addTask]
  );
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="add-button">
          Add Task
        </button>
      </div>
    </form>
  );
};

// ✅ Make sure to export as default
export default TaskForm;
