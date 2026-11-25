import React, { useState, useEffect } from 'react';
import { X, Calendar, Flag, AlignLeft, Check, AlertCircle } from 'lucide-react';

/**
 * TaskForm Component (Modal Dialog)
 * Handles both creating new tasks and editing existing tasks.
 * Demonstrates useState, useEffect for prop syncing, controlled components,
 * form validation, and event handling.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal dialog is visible
 * @param {Function} props.onClose - Callback to close modal
 * @param {Function} props.onSubmit - Callback when valid task is submitted (receives task data)
 * @param {Object|null} props.taskToEdit - Task object if in edit mode, or null if creating
 */
const TaskForm = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  // Controlled component states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  // Sync state whenever taskToEdit changes (Edit Mode vs Create Mode)
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDescription(taskToEdit.description || '');
      setPriority(taskToEdit.priority || 'Medium');
      setDueDate(taskToEdit.dueDate || '');
      setError('');
    } else {
      // Reset form fields for new task
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setDueDate('');
      setError('');
    }
  }, [taskToEdit, isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Title is required
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Task title is required. Please provide a brief title.');
      return;
    }

    // Assemble task payload
    const taskData = {
      title: trimmedTitle,
      description: description.trim(),
      priority,
      dueDate,
      ...(taskToEdit ? { id: taskToEdit.id, completed: taskToEdit.completed, createdAt: taskToEdit.createdAt } : {})
    };

    onSubmit(taskData);
    onClose();
  };

  const priorityOptions = [
    { value: 'Low', label: 'Low', color: 'border-emerald-200 text-emerald-700 active:bg-emerald-50', activeBg: 'bg-emerald-600 text-white border-emerald-600' },
    { value: 'Medium', label: 'Medium', color: 'border-amber-200 text-amber-700 active:bg-amber-50', activeBg: 'bg-amber-500 text-white border-amber-500' },
    { value: 'High', label: 'High', color: 'border-rose-200 text-rose-700 active:bg-rose-50', activeBg: 'bg-rose-600 text-white border-rose-600' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="animate-modal relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-lg border border-slate-100"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 id="modal-headline" className="text-lg font-bold text-slate-900">
              {taskToEdit ? 'Edit Task' : 'Create New Task'}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            
            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold" role="alert">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Title Field (Required) */}
            <div>
              <label htmlFor="task-title" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g., Finalize quarterly presentation slides"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                  error ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200' : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
                }`}
                autoFocus
              />
            </div>

            {/* Description Field (Optional) */}
            <div>
              <label htmlFor="task-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Description <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="task-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add subtasks, links, notes, or acceptance criteria..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors resize-none"
              />
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPriority(opt.value)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      priority === opt.value
                        ? opt.activeBg
                        : `bg-white ${opt.color} hover:bg-slate-50`
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date Field (Optional) */}
            <div>
              <label htmlFor="task-due-date" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Due Date <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  id="task-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-colors"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>{taskToEdit ? 'Save Changes' : 'Create Task'}</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
