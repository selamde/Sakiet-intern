import React from 'react';
import { CheckSquare, Plus, Calendar, Menu } from 'lucide-react';

/**
 * Navbar Component
 * Displays the TaskFlow application brand, welcome greeting, live current date,
 * and a prominent call-to-action button to create new tasks.
 *
 * @param {Object} props
 * @param {Function} props.onOpenTaskForm - Callback to open task creation modal
 * @param {Function} props.onToggleSidebar - Callback to toggle mobile navigation drawer
 */
const Navbar = ({ onOpenTaskForm, onToggleSidebar }) => {
  // Format current date nicely (e.g., "Thursday, Nov 19, 2026")
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Hamburger button for mobile screens */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* TaskFlow Brand */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                    Task<span className="text-indigo-600">Flow</span>
                  </h1>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wider">
                    v1.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Manage your tasks, stay productive.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Date Badge & Add Task Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Current Date Display */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200/60">
              <Calendar className="w-4 h-4 text-indigo-600" />
              <span>{formattedDate}</span>
            </div>

            {/* Prominent Add Task Button */}
            <button
              type="button"
              onClick={onOpenTaskForm}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Add new task"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
