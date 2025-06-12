# Natural Language Task Manager

This project is an enterprise-grade to-do list web application that allows users to add tasks using natural language input and automatically extracts task details.

## Features

- **Natural Language Processing**: Extracts task name, assignee, due date/time, and priority from natural language input.
  - Example: "Finish landing page Aman by 11pm 20th June"
  - Example: "Call client Rajeev tomorrow 5pm"
- **Task Display**: Displays parsed tasks in a beautiful UI task board/list.
- **Task Management**: Edit, delete, and mark tasks as complete.
- **Data Persistence**: Tasks are saved to local storage.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/devendra684/Natural-Language-Task-Manager.git
   cd Natural-Language-Task-Manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Enter a task** in natural language format in the input field
   - Example: "Finish landing page Aman by 11pm 20th June"
   - Example: "Call client Rajeev tomorrow 5pm"

2. **Click "Add Task"** or press Enter

3. The task will be **parsed and displayed** in the task list with the following information:
   - Task Name
   - Assignee
   - Due Date/Time
   - Priority (P1, P2, P3, or P4, with P3 as default)

4. You can **edit, delete, or mark tasks as complete** using the provided buttons

## How It Works

The application uses a combination of regular expressions and the chrono-node library to parse natural language input and extract relevant information:

- Task name is extracted from the beginning of the input
- Assignee is identified as a name before date/time indicators
- Due date and time are parsed using chrono-node
- Priority is extracted if specified (P1, P2, P3, P4), defaulting to P3

## Project Structure

- `src/components/TaskForm.js`: Handles task input and parsing
- `src/components/TaskList.js`: Displays the list of tasks
- `src/components/TaskItem.js`: Renders individual task items with edit functionality
- `src/App.js`: Main application component that manages state
- `src/App.css`: Styling for the application
