import React, { useState } from 'react';
import { 
  Search, 
  X, 
  ArrowUpDown, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import TaskItem from './TaskItem';
import EmptyState from './EmptyState';

/**
 * TaskList Component
 * Displays the search filter toolbar, sort controls, and the list of TaskItem cards.
 * Demonstrates list rendering using map(), key usage, event delegation, and conditional rendering.
 *
 * @param {Object} props
 * @param {Array} props.tasks - The full list of tasks
 * @param {string} props.activeFilter - Active category filter ('all', 'pending', 'completed', 'high')
 * @param {string} props.searchQuery - Current search string
 * @param {Function} props.onSearchChange - Callback for search input changes
 * @param {Function} props.onToggleComplete - Callback to toggle task completion
 * @param {Function} props.onEdit - Callback to edit a task
 * @param {Function} props.onDelete - Callback to request deletion of a task
 * @param {Function} props.onResetFilter - Callback to reset active filter
 * @param {Function} props.onOpenTaskForm - Callback to open task form modal
 */
const TaskList = ({
  tasks,
  activeFilter,
  searchQuery,
  onSearchChange,
  onToggleComplete,
  onEdit,
  onDelete,
  onResetFilter,
  onOpenTaskForm
}) => {
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'due', 'priority'

  // 1. Filter Tasks by Category/Status
  const filteredTasks = tasks.filter((task) => {
    // Category Filter
    if (activeFilter === 'pending' && task.completed) return false;
    if (activeFilter === 'completed' && !task.completed) return false;
    if (activeFilter === 'high' && task.priority !== 'High') return false;

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchDesc = task.description && task.description.toLowerCase().includes(query);
      return matchTitle || matchDesc;
    }

    return true;
  });

  // 2. Sort Filtered Tasks
  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    }
    if (sortBy === 'due') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    return 0;
  });

  const filterLabels = {
    all: 'All Tasks',
    pending: 'Pending Tasks',
    completed: 'Completed Tasks',
    high: 'High Priority Tasks'
  };

  return (
    <div className="space-y-4">
      
      {/* Search Bar & Sorting Controls Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title or notes..."
            className="w-full pl-9 pr-9 py-2 rounded-xl border border-slate-200 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
            aria-label="Search tasks"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Details & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="text-xs font-semibold text-slate-500">
            <span className="text-slate-900 font-bold">{sortedTasks.length}</span> {sortedTasks.length === 1 ? 'task' : 'tasks'}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:border-slate-300 focus:outline-none focus:border-indigo-600 transition-colors"
              aria-label="Sort tasks by"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="due">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

      </div>

      {/* Current Filter Indicator Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>{filterLabels[activeFilter] || 'Tasks'}</span>
          {searchQuery && (
            <span className="text-xs font-normal text-slate-500">
              matching "{searchQuery}"
            </span>
          )}
        </h2>
      </div>

      {/* Task List or Empty State */}
      {sortedTasks.length > 0 ? (
        <div className="space-y-3" role="list" aria-label="Task list">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          filter={activeFilter}
          searchQuery={searchQuery}
          onResetSearch={() => onSearchChange('')}
          onResetFilter={onResetFilter}
          onOpenTaskForm={onOpenTaskForm}
        />
      )}

    </div>
  );
};

export default TaskList;
