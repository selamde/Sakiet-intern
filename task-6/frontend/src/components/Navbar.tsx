import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Bell,
  User as UserIcon,
  Plus,
  Activity,
  CheckCircle2,
  Database,
  ExternalLink,
  Shield,
  Settings,
  LogOut,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { checkHealth } from '@/services/userService';
import { HealthStatusResponse } from '@/types/user';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [health, setHealth] = useState<HealthStatusResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  const [notifications] = useState([
    { id: 1, title: 'Database Connected', time: 'Just now', unread: true },
    { id: 2, title: 'REST API v1.0 running on port 5000', time: '5m ago', unread: true },
    { id: 3, title: 'Prisma Client initialized', time: '10m ago', unread: false },
  ]);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const data = await checkHealth();
        setHealth(data);
      } catch (err) {
        console.warn('Backend health check warning:', err);
      }
    };
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/users?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xs">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 gap-4">
        
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenuClick}
          className="lg:hidden text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Brand Logo for mobile & small screens */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-foreground">UserHub</span>
        </div>

        {/* Global Search Bar (Shadcn style with keyboard shortcut) */}
        <div className="hidden md:flex flex-1 max-w-md items-center">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Quick search users or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-14 h-9 bg-muted/40 border-muted focus-visible:bg-background transition-colors text-xs"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
              ↵ Enter
            </kbd>
          </form>
        </div>

        <div className="flex-1 md:hidden" />

        {/* Right Header Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live System Health Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-card text-xs font-medium shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                health?.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                health?.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
            </span>
            <span className="text-muted-foreground">API:</span>
            <span className="font-semibold text-foreground">
              {health?.status === 'healthy' ? 'Online' : 'Active'}
            </span>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-primary/30 text-primary">
              {health?.database?.provider || 'PostgreSQL'}
            </Badge>
          </div>

          {/* Quick Add User Button */}
          <Button
            asChild
            size="sm"
            className="hidden sm:inline-flex gap-1.5 shadow-sm shadow-primary/25"
          >
            <Link to="/users/new">
              <Plus className="h-4 w-4" />
              <span>Add User</span>
            </Link>
          </Button>

          {/* Theme Toggle (Light / Dark) */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setIsDark(!isDark)}
            className="rounded-xl border-border bg-card"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="relative rounded-xl border-border bg-card"
                aria-label="View notifications"
              >
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-2">
              <div className="flex items-center justify-between px-2 py-1.5">
                <DropdownMenuLabel className="p-0 font-bold text-foreground">
                  Notifications
                </DropdownMenuLabel>
                <Badge variant="secondary" className="text-[10px]">
                  3 New
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-1">
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className="flex flex-col items-start gap-1 p-2 rounded-lg cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{n.title}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground pl-3">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <div className="p-1 text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-primary justify-center"
                  onClick={() => navigate('/users')}
                >
                  View System Events
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 p-0"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5">
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xs">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">Admin Workspace</p>
                  <p className="text-[11px] text-muted-foreground truncate">admin@userhub.dev</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Dashboard Overview</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/users')}>
                <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Manage Users</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/users/new')}>
                <Plus className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Register New Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.open('http://localhost:5000/api/health', '_blank')}>
                <Database className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>API Health Status</span>
                <ExternalLink className="ml-auto h-3 w-3 opacity-60" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
