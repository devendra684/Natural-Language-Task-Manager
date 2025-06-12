import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDeleteTask, onEditTask, onToggleComplete }) => {
  if (tasks.length === 0) {
    return <div className="empty-list">No tasks yet. Add one above!</div>;
  }

  return (
    <div className="task-list">
      <div className="task-header">
        <div className="task-column">Task</div>
        <div className="task-column">Assigned To</div>
        <div className="task-column">Due Date/Time</div>
        <div className="task-column">Priority</div>
        <div className="task-column">Actions</div>
      </div>
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;