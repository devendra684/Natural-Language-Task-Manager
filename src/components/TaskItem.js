import React, { useState } from 'react';

const TaskItem = ({ task, onDeleteTask, onEditTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const formatDate = (date) => {
    if (!date) return 'No date';
    
    const options = { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true,
      day: 'numeric', 
      month: 'long'
    };
    
    return new Date(date).toLocaleString('en-US', options);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditTask(editedTask);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setEditedTask(prev => ({
      ...prev,
      dueDate: value ? new Date(value) : null
    }));
  };

  if (isEditing) {
    return (
      <div className={`task-item ${task.completed ? 'completed' : ''}`}>
        <form onSubmit={handleEditSubmit} className="edit-form">
          <div className="task-column">
            <input
              type="text"
              name="name"
              value={editedTask.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="task-column">
            <input
              type="text"
              name="assignee"
              value={editedTask.assignee}
              onChange={handleChange}
            />
          </div>
          <div className="task-column">
            <input
              type="datetime-local"
              name="dueDate"
              value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().slice(0, 16) : ''}
              onChange={handleDateChange}
            />
          </div>
          <div className="task-column">
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
            >
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
              <option value="P4">P4</option>
            </select>
          </div>
          <div className="task-column actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-column">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="task-checkbox"
        />
        <span className={task.completed ? 'completed-text' : ''}>{task.name}</span>
      </div>
      <div className="task-column">{task.assignee || 'Unassigned'}</div>
      <div className="task-column">{task.dueDate ? formatDate(task.dueDate) : 'No deadline'}</div>
      <div className="task-column">
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
      </div>
      <div className="task-column actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
        <button onClick={() => onDeleteTask(task.id)} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;