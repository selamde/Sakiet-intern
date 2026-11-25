import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Database,
  Layers,
  Server,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
    },
    {
      to: '/users',
      label: 'Users Directory',
      icon: Users,
    },
    {
      to: '/users/new',
      label: 'Register User',
      icon: UserPlus,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r bg-card text-card-foreground transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto flex flex-col ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-tight text-foreground">UserHub</span>
                <Badge variant="info" className="text-[10px] px-1 py-0 h-4">v2.0</Badge>
              </div>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Full Stack CRUD
              </p>
            </div>
          </Link>

          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-6 space-y-6">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Management
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 transition-colors ${
                            isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          variant={isActive ? 'secondary' : 'outline'}
                          className={`text-[10px] font-bold px-1.5 py-0 h-4 ${
                            isActive ? 'bg-primary-foreground/20 text-primary-foreground border-transparent' : ''
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          <Separator className="my-2" />

          {/* Quick Info & Architecture */}
          <div className="space-y-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Architecture Tiers
            </p>
            <div className="px-3 space-y-2">
              <div className="flex items-center justify-between text-xs py-1 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  Frontend
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">React + TS</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  API Server
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">Express.js</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  ORM Client
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">Prisma v5</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Database
                </span>
                <span className="font-mono text-[11px] font-semibold text-foreground">PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Health Status Card */}
        <div className="p-4 border-t">
          <div className="rounded-xl border bg-muted/30 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                System Health
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Express API running on port 5000 with CORS and input validation.
            </p>
            <a
              href="http://localhost:5000/api/health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              <span>View Health Endpoint</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
