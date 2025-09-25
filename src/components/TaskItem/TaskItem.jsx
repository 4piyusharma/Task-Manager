import React, { useState, useCallback, memo } from "react";
import { useTasks } from "../../contexts/TaskContext";
import "./TaskItem.css";

const TaskItem = memo(({ task, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const { toggleTask, deleteTask, updateTaskText } = useTasks();

  const handleToggle = useCallback(() => {
    toggleTask(task.id);
  }, [toggleTask, task.id]);

  const handleDelete = useCallback(() => {
    deleteTask(task.id);
  }, [deleteTask, task.id]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditText(task.text);
  }, [task.text]);

  const handleSave = useCallback(() => {
    if (editText.trim() && editText !== task.text) {
      updateTaskText(task.id, editText);
    }
    setIsEditing(false);
  }, [editText, updateTaskText, task.id, task.text]);

  const handleCancel = useCallback(() => {
    setEditText(task.text);
    setIsEditing(false);
  }, [task.text]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSave();
      } else if (e.key === "Escape") {
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <div className="task-main-content">
        <div className="drag-handle" title="Drag to reorder">
          ⋮⋮
        </div>

        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />

        <div className="task-text-container">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="edit-input"
              autoFocus
            />
          ) : (
            <span className="task-text" onDoubleClick={handleEdit}>
              {task.text}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        {!isEditing ? (
          <>
            <button onClick={handleEdit} className="action-button edit-button">
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="action-button delete-button"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSave} className="action-button save-button">
              Save
            </button>
            <button
              onClick={handleCancel}
              className="action-button cancel-button"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
});

TaskItem.displayName = "TaskItem";

// ✅ Make sure to export as default
export default TaskItem;
