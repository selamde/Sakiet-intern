import React from 'react';
import { ListTodo, CheckCircle2, Clock, Flame } from 'lucide-react';

/**
 * TaskStats Component
 * Displays summary metric cards for quick productivity insights.
 * Automatically updates whenever tasks are created, edited, toggled, or deleted.
 *
 * @param {Object} props
 * @param {Object} props.stats - Calculated task statistics { total, completed, pending, high }
 * @param {Function} props.onSelectFilter - Optional callback to quick-filter when clicking a card
 */
const TaskStats = ({ stats, onSelectFilter }) => {
  const cards = [
    {
      id: 'all',
      title: 'Total Tasks',
      value: stats.total,
      subtitle: 'All tracked items',
      icon: ListTodo,
      bgIcon: 'bg-indigo-50 text-indigo-600',
      borderHover: 'hover:border-indigo-400',
      badgeColor: 'text-indigo-700 bg-indigo-50'
    },
    {
      id: 'completed',
      title: 'Completed',
      value: stats.completed,
      subtitle: stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}% done` : 'No tasks yet',
      icon: CheckCircle2,
      bgIcon: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-400',
      badgeColor: 'text-emerald-700 bg-emerald-50'
    },
    {
      id: 'pending',
      title: 'Pending',
      value: stats.pending,
      subtitle: 'Awaiting completion',
      icon: Clock,
      bgIcon: 'bg-amber-50 text-amber-600',
      borderHover: 'hover:border-amber-400',
      badgeColor: 'text-amber-700 bg-amber-50'
    },
    {
      id: 'high',
      title: 'High Priority',
      value: stats.high,
      subtitle: 'Requires focus',
      icon: Flame,
      bgIcon: 'bg-rose-50 text-rose-600',
      borderHover: 'hover:border-rose-400',
      badgeColor: 'text-rose-700 bg-rose-50'
    }
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8" aria-label="Task statistics">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onSelectFilter && onSelectFilter(card.id)}
            className={`bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm transition-all duration-200 cursor-pointer ${card.borderHover} hover:shadow-md hover:-translate-y-0.5 group`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectFilter && onSelectFilter(card.id);
              }
            }}
            aria-label={`${card.title}: ${card.value}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                {card.title}
              </span>
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${card.bgIcon}`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {card.value}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 truncate ml-2">
                {card.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TaskStats;
