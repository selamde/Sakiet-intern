import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'blue';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  color = 'indigo',
}) => {
  const colorMap = {
    indigo: {
      iconBg: 'bg-primary/10 text-primary',
      borderHover: 'hover:border-primary/40',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
      borderHover: 'hover:border-emerald-300 dark:hover:border-emerald-800',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
      borderHover: 'hover:border-amber-300 dark:hover:border-amber-800',
    },
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
      borderHover: 'hover:border-blue-300 dark:hover:border-blue-800',
    },
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <Card className={`transition-all duration-200 ${scheme.borderHover} hover:shadow-md hover:-translate-y-0.5`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${scheme.iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </div>
          {badge && (
            <Badge variant="outline" className="text-[10px] font-bold">
              {badge}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
