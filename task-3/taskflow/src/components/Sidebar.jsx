import React from 'react';
import { 
  ListTodo, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Trash2, 
  X, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

/**
 * Sidebar Component
 * Provides task filtering navigation, category counters, productivity progress,
 * and quick housekeeping actions. Supports both desktop sidebar and mobile slide-over drawer.
 *
 * @param {Object} props
 * @param {string} props.activeFilter - Current selected filter ('all', 'pending', 'completed', 'high')
 * @param {Function} props.onSelectFilter - Callback when user switches filter
 * @param {Object} props.stats - Calculated counts { total, pending, completed, high }
 * @param {boolean} props.isOpen - Whether the mobile drawer is currently open
 * @param {Function} props.onClose - Callback to close mobile drawer
 * @param {Function} props.onClearCompleted - Callback to remove all completed tasks
 */
const Sidebar = ({
  activeFilter,
  onSelectFilter,
  stats,
  isOpen,
  onClose,
  onClearCompleted
}) => {
  // Navigation filter tabs configuration
  const filterTabs = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: ListTodo,
      count: stats.total,
      color: 'text-indigo-600',
      activeBg: 'bg-indigo-50 text-indigo-700 font-bold'
    },
    {
      id: 'pending',
      label: 'Pending',
      icon: Clock,
      count: stats.pending,
      color: 'text-amber-500',
      activeBg: 'bg-amber-50 text-amber-700 font-bold'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle2,
      count: stats.completed,
      color: 'text-emerald-600',
      activeBg: 'bg-emerald-50 text-emerald-700 font-bold'
    },
    {
      id: 'high',
      label: 'High Priority',
      icon: Flame,
      count: stats.high,
      color: 'text-rose-500',
      activeBg: 'bg-rose-50 text-rose-700 font-bold'
    }
  ];

  // Productivity completion percentage calculation
  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-5">
      
      {/* Top Section: Navigation Filter Tabs */}
      <div>
        
        {/* Mobile Header with close button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 lg:hidden">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Task Navigation</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Views &amp; Filters
        </div>

        <nav className="space-y-1.5" aria-label="Task filters">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectFilter(tab.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all duration-200 group ${
                  isActive
                    ? tab.activeBg
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : tab.color}`} />
                  <span>{tab.label}</span>
                </div>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? 'bg-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Productivity Progress Card & Clear Completed Action */}
      <div className="pt-6 border-t border-slate-200/80 space-y-4">
        
        {/* Productivity Completion Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 border border-indigo-100/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
              Completion Rate
            </span>
            <span className="text-sm font-extrabold text-indigo-600">
              {completionPercentage}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden mb-2">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            {stats.completed === stats.total && stats.total > 0
              ? '🎉 Outstanding! All tasks completed!'
              : `${stats.pending} remaining task${stats.pending === 1 ? '' : 's'} on your schedule.`}
          </p>
        </div>

        {/* Clear Completed Tasks Button */}
        {stats.completed > 0 && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/60 transition-all active:scale-95"
            aria-label="Clear completed tasks"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Completed ({stats.completed})</span>
          </button>
        )}

      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0 bg-white border-r border-slate-200 min-h-[calc(100vh-5rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;
