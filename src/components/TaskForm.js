import React, { useState } from 'react';
import * as chrono from 'chrono-node';

const TaskForm = ({ onAddTask }) => {
  const [taskInput, setTaskInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskInput.trim()) return;
    
    const parsedTask = parseTask(taskInput);
    onAddTask(parsedTask);
    setTaskInput('');
  };

  const parseTask = (input) => {
    // Default values
    let taskName = input;
    let assignee = '';
    let dueDate = null;
    let priority = 'P3';
    
    // Extract priority if specified (P1, P2, P3, P4)
    const priorityMatch = input.match(/\b(P[1-4])\b/);
    if (priorityMatch) {
      priority = priorityMatch[0];
      taskName = taskName.replace(priorityMatch[0], '').trim();
    }
    
    // Extract assignee (assuming format: "task assignee by date")
    const assigneeMatch = taskName.match(/\s(\w+)\s+by\s+/i);
    if (assigneeMatch) {
      assignee = assigneeMatch[1];
      const parts = taskName.split(assigneeMatch[0]);
      taskName = parts[0].trim();
      // The rest of the string might contain the date
      if (parts[1]) {
        const dateText = parts[1].trim();
        const parsedDate = chrono.parseDate(dateText);
        if (parsedDate) {
          dueDate = parsedDate;
        }
      }
    } else {
      // Try to find date in the whole string
      const parsedResults = chrono.parse(taskName);
      if (parsedResults && parsedResults.length > 0) {
        dueDate = parsedResults[0].start.date();
        // Remove the date part from the task name
        taskName = taskName.replace(parsedResults[0].text, '').trim();
        
        // Check if there's an assignee before the date
        const beforeDate = taskName.split(' ');
        if (beforeDate.length > 1) {
          assignee = beforeDate[beforeDate.length - 1];
          taskName = beforeDate.slice(0, beforeDate.length - 1).join(' ');
        }
      }
    }
    
    return {
      id: Date.now(),
      name: taskName,
      assignee,
      dueDate,
      priority,
      completed: false
    };
  };

  return (
    <div className="task-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a task like: Finish landing page Aman by 11pm 20th June"
          className="task-input"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;