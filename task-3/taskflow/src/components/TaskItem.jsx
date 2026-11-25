import React from 'react';
import { 
  Check, 
  Calendar, 
  Edit3, 
  Trash2, 
  Flag, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

/**
 * TaskItem Component
 * Renders an individual task card with interactive completion toggle,
 * priority badge, due date status (including overdue/today tags),
 * and action buttons for editing and deletion.
 *
 * @param {Object} props
 * @param {Object} props.task - The task data item
 * @param {Function} props.onToggleComplete - Callback to toggle task completion status
 * @param {Function} props.onEdit - Callback to edit task (opens modal)
 * @param {Function} props.onDelete - Callback to request task deletion
 */
const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  // Format due date and check overdue status
  const getDueDateStatus = (dueDateString) => {
    if (!dueDateString) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [year, month, day] = dueDateString.split('-').map(Number);
    const dueDate = new Date(year, month - 1, day);
    dueDate.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    const formatted = dueDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: dueDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });

    if (diffDays < 0) {
      return { text: `${formatted} (Overdue)`, isOverdue: true };
    } else if (diffDays === 0) {
      return { text: 'Today', isToday: true };
    } else if (diffDays === 1) {
      return { text: 'Tomorrow', isTomorrow: true };
    }
    return { text: formatted, isUpcoming: true };
  };

  const dueStatus = getDueDateStatus(task.dueDate);

  // Priority color styling
  const priorityConfig = {
    High: {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500'
    },
    Medium: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-500'
    },
    Low: {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500'
    }
  };

  const currentPriority = priorityConfig[task.priority] || priorityConfig.Medium;

  return (
    <article
      className={`group rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
        task.completed
          ? 'bg-slate-50/80 border-slate-200/60 opacity-80'
          : 'bg-white border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        
        {/* Complete / Undo Circular Button */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 mt-0.5 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
              : 'border-slate-300 hover:border-indigo-600 bg-white group-hover:scale-105'
          }`}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
        >
          {task.completed ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-indigo-600/30 transition-colors" />
          )}
        </button>

        {/* Task Content Details */}
        <div className="flex-grow min-w-0">
          
          {/* Header Row: Title & Action Buttons */}
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-base sm:text-lg font-bold leading-snug break-words transition-all ${
                task.completed
                  ? 'line-through text-slate-400'
                  : 'text-slate-900 group-hover:text-indigo-950'
              }`}
            >
              {task.title}
            </h3>

            {/* Action Buttons (Edit & Delete) */}
            <div className="flex items-center gap-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Edit task"
                aria-label={`Edit ${task.title}`}
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete task"
                aria-label={`Delete ${task.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description Text (If present) */}
          {task.description && (
            <p
              className={`mt-1.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                task.completed ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Meta Tags Row: Priority, Due Date */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs">
            
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-semibold ${currentPriority.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${currentPriority.dot}`} />
              <span>{task.priority} Priority</span>
            </span>

            {/* Due Date Indicator */}
            {dueStatus && (
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-medium ${
                  !task.completed && dueStatus.isOverdue
                    ? 'bg-rose-50 border-rose-200 text-rose-700 font-bold'
                    : !task.completed && dueStatus.isToday
                    ? 'bg-amber-50 border-amber-200 text-amber-700 font-bold'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {!task.completed && dueStatus.isOverdue ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                ) : (
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{dueStatus.text}</span>
              </span>
            )}

            {/* Completed Timestamp tag */}
            {task.completed && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <Check className="w-3 h-3" /> Completed
              </span>
            )}

          </div>

        </div>

      </div>
    </article>
  );
};

export default TaskItem;
