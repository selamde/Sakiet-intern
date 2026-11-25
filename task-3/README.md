# TaskFlow - Modern React.js Task Management Application

A professional, responsive, and minimalist productivity dashboard built with **React.js (functional components)**, **Vite**, **Tailwind CSS**, and **Lucide React**.

TaskFlow allows users to organize their daily schedule by creating, viewing, editing, completing, and deleting tasks with full browser `localStorage` persistence.

---

## 🚀 Quick Start & Setup Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher)

### 1. Installation
Navigate to the `taskflow` directory and install dependencies:
```bash
cd taskflow
npm install
```

### 2. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser and navigate to the local server URL displayed in the terminal (typically `http://localhost:5173`).

### 3. Build for Production
To build the optimized static production bundle:
```bash
npm run build
```

### 4. Preview Production Build
To preview the generated production build locally:
```bash
npm run preview
```

---

## 🎨 UI/UX Design & Theme

- **Design Philosophy**: Minimalist and modern productivity dashboard.
- **Palette**: Clean light slate background (`#F8FAFC`), crisp white cards (`#FFFFFF`), obsidian text (`#1E293B`), and an elegant indigo accent (`#4F46E5` / `#6366F1`).
- **Typography**: Google Fonts **Plus Jakarta Sans** with clean letter-spacing and hierarchy.
- **Micro-Interactions**: Smooth modal dialog transitions, strikethrough animation for completed tasks, hover elevation shadows, and toast notifications.
- **Responsiveness**: Fully responsive across mobile phones (320px+), tablets, laptops, and large desktop screens.

---

## 📂 Project Structure

```text
taskflow/
│
├── public/                     # Static public assets
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Header with branding, date, mobile toggle & Add Task button
│   │   ├── Sidebar.jsx         # Category filters, counters, progress bar & mobile drawer
│   │   ├── TaskStats.jsx       # Dynamic summary cards (Total, Completed, Pending, High Priority)
│   │   ├── TaskList.jsx        # Search toolbar, sorting controls & list rendering
│   │   ├── TaskItem.jsx        # Task card with complete/undo, badges, edit & delete buttons
│   │   ├── TaskForm.jsx        # Modal form for creating and editing tasks with validation
│   │   ├── EmptyState.jsx      # Contextual empty state illustrations and actions
│   │   └── DeleteConfirmModal.jsx # Confirmation dialog before deleting tasks
│   │
│   ├── App.jsx                 # Root component with centralized state & CRUD logic
│   ├── main.jsx                # Application entry point mounting React root
│   └── index.css               # Tailwind CSS directives and custom animations
│
├── index.html                  # HTML entry point with metadata and Google Fonts
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite React configuration
├── tailwind.config.js          # Tailwind CSS theme tokens
├── postcss.config.js           # PostCSS configuration
└── README.md                   # Complete documentation
```

---

## ✨ Features & Functionality

### 1. Dashboard Header (`Navbar.jsx`)
- **Branding**: TaskFlow logo with stylized checkmark icon and version pill.
- **Welcome Greeting**: *"Manage your tasks, stay productive."*
- **Live Formatted Date**: Dynamically displays current day and date (e.g. `Thursday, Nov 19, 2026`).
- **Add Task Button**: Prominent primary button triggering the creation modal.
- **Mobile Menu Button**: Hamburger menu icon opening the responsive navigation drawer on mobile viewports.

### 2. Dynamic Task Statistics (`TaskStats.jsx`)
- Four responsive summary metric cards:
  - **Total Tasks**: Overall count of all active and completed tasks.
  - **Completed Tasks**: Number of completed items and percentage completion rate.
  - **Pending Tasks**: Number of items awaiting completion.
  - **High Priority**: Number of urgent/high-priority tasks.
- Updates dynamically in real-time as tasks are added, modified, completed, or removed.

### 3. Task Creation & Editing (`TaskForm.jsx`)
- **Controlled Component Inputs**:
  - Task Title (Required) with inline validation.
  - Description (Optional multi-line notes).
  - Priority Level (`Low`, `Medium`, `High`) with color-coded toggle buttons.
  - Due Date (Optional HTML5 date picker).
- **Edit Mode**: Pre-populates all existing task attributes when the edit button on any card is clicked.
- **Escape Key & Backdrop Close**: Keyboard and overlay event handlers for accessibility.

### 4. Display & Organization (`TaskList.jsx` & `TaskItem.jsx`)
- Clean card-based task display with:
  - Interactive circular Complete/Undo toggle button.
  - Strikethrough text styling and subtle muted tone when completed.
  - Priority badge (Red/Rose for High, Amber for Medium, Blue for Low).
  - Smart due date indicator with **Overdue** (red alert) and **Today** (amber alert) status tags.
  - Edit and Delete quick action buttons.

### 5. Task Deletion with Confirmation (`DeleteConfirmModal.jsx`)
- Protects users from accidental data loss.
- Displays a confirmation modal with the specific task title before deletion.
- Immediately removes the task and updates statistics upon confirmation.

### 6. Search & Multi-Criteria Filtering
- **Live Search**: Instant real-time filtering as the user types keywords in title or description.
- **Category Filter Tabs**:
  - All Tasks
  - Pending
  - Completed
  - High Priority
- **Sort Options**:
  - Newest First
  - Oldest First
  - Due Date (Soonest first)
  - Priority (High to Low)

### 7. Data Persistence (`localStorage`)
- Uses React's `useEffect` hook to serialize and save the task list under `taskflow_tasks`.
- Automatically restores all tasks, completion states, and edits when the browser is refreshed.
- Pre-loaded with realistic sample tasks on first launch.

### 8. Productivity Progress & Housekeeping
- Sidebar widget showing the live completion percentage bar.
- **"Clear Completed Tasks"** utility button to quickly purge finished items.

---

## 🧠 React Concepts Demonstrated

1. **Component-Based Architecture**: Modular separation into individual, single-responsibility files inside `src/components/`.
2. **JSX**: Clean, semantic markup combining HTML structure with dynamic JavaScript expressions.
3. **Props & Callback Functions**: Unidirectional data flow from `App.jsx` down to children, with callback event handlers passed down for user actions.
4. **`useState` Hook**:
   - Task list management.
   - Form inputs (`title`, `description`, `priority`, `dueDate`, `error`).
   - Active filter selection (`activeFilter`).
   - Search query string (`searchQuery`).
   - Sorting choice (`sortBy`).
   - Modal visibility flags (`isTaskFormOpen`, `isSidebarOpen`, `taskToEdit`, `taskToDelete`).
5. **`useEffect` Hook**:
   - Synchronizing task state with browser `localStorage`.
   - Attaching and cleaning up keyboard listeners (`Escape` key to close modals).
   - Syncing form fields when `taskToEdit` prop changes.
6. **Event Handling**: Form submissions (`onSubmit` with `e.preventDefault()`), input changes (`onChange`), and click events (`onClick`).
7. **Conditional Rendering**:
   - Completed vs. Pending visual styles (line-through, checkmark, opacity).
   - Overdue vs. Today vs. Upcoming due date badges.
   - Empty state components rendered when filters or search yield zero matches.
   - Modal dialogs conditionally rendered based on boolean flags.
8. **List Rendering (`.map()`)**: Rendering task collections with unique `key={task.id}` attributes.
9. **Full CRUD Implementation**:
   - **C**reate: `handleSaveTask` generates unique IDs and prepends tasks.
   - **R**ead: Dynamic filtering, sorting, and displaying tasks.
   - **U**pdate: Modifying title, description, priority, due date, and completion status.
   - **D**elete: Confirmation dialog and state filtering.
