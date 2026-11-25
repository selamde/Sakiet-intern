import React from 'react';
import { 
  CheckCircle2, 
  SearchX, 
  ListPlus, 
  Clock, 
  Flame, 
  RotateCcw 
} from 'lucide-react';

/**
 * EmptyState Component
 * Displays contextual feedback and illustrations when a task list is empty,
 * whether from search filters, completion status, or initial zero state.
 *
 * @param {Object} props
 * @param {string} props.filter - Current active filter ('all', 'pending', 'completed', 'high')
 * @param {string} props.searchQuery - Current search query if user is searching
 * @param {Function} props.onResetSearch - Callback to clear search term
 * @param {Function} props.onResetFilter - Callback to reset filter to 'all'
 * @param {Function} props.onOpenTaskForm - Callback to open task creation modal
 */
const EmptyState = ({
  filter,
  searchQuery,
  onResetSearch,
  onResetFilter,
  onOpenTaskForm
}) => {
  // Scenario 1: Search returned no results
  if (searchQuery) {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          No matching tasks found
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          No tasks match <span className="font-semibold text-slate-700">"{searchQuery}"</span>. Try adjusting your search keywords.
        </p>
        <button
          type="button"
          onClick={onResetSearch}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Search</span>
        </button>
      </div>
    );
  }

  // Scenario 2: Specific filter is empty
  if (filter === 'completed') {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          No completed tasks yet
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Check off tasks as you finish them to see them archived here.
        </p>
        <button
          type="button"
          onClick={onResetFilter}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all"
        >
          <span>View All Tasks</span>
        </button>
      </div>
    );
  }

  if (filter === 'pending') {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          You're all caught up!
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          No pending tasks left on your list. Enjoy your free time or plan ahead!
        </p>
        <button
          type="button"
          onClick={onOpenTaskForm}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20"
        >
          <ListPlus className="w-3.5 h-3.5" />
          <span>Create New Task</span>
        </button>
      </div>
    );
  }

  if (filter === 'high') {
    return (
      <div className="text-center py-12 px-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <Flame className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          No high priority tasks
        </h3>
        <p className="text-sm text-slate-500 mb-6">
          Great job! There are no urgent or high-priority items demanding immediate action.
        </p>
        <button
          type="button"
          onClick={onResetFilter}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
        >
          <span>View All Tasks</span>
        </button>
      </div>
    );
  }

  // Scenario 3: Complete initial empty state (0 tasks in system)
  return (
    <div className="text-center py-16 px-4 rounded-3xl bg-white border border-slate-200/80 shadow-sm max-w-lg mx-auto my-8">
      <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-indigo-100">
        <ListPlus className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">
        Ready to organize your day?
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        TaskFlow makes task tracking effortless. Create your first task to start organizing your work and personal projects.
      </p>
      <button
        type="button"
        onClick={onOpenTaskForm}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/25 active:scale-95 transition-all"
      >
        <ListPlus className="w-4 h-4" />
        <span>Create Your First Task</span>
      </button>
    </div>
  );
};

export default EmptyState;
