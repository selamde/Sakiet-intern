import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Calendar,
  Database,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Activity,
  Layers,
  Sparkles,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Server
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import StatsCard from '@/components/StatsCard';
import { getDashboardStats } from '@/services/userService';
import { DashboardStats, User } from '@/types/user';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getDashboardStats();
      if (response && response.data) {
        setStats(response.data);
      } else {
        throw new Error('Malformed stats response from server');
      }
    } catch (err: any) {
      console.error('Failed to load dashboard statistics:', err);
      setError(err.response?.data?.message || err.message || 'Unable to connect to backend.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Recharts Data for Age Distribution Bar Chart using TweakCN theme variables
  const ageChartData = [
    {
      name: 'Under 25',
      count: stats?.ageDistribution?.under25 ?? 0,
      fill: 'var(--primary)',
    },
    {
      name: '25 - 35',
      count: stats?.ageDistribution?.age25to35 ?? 0,
      fill: 'var(--chart-2, #3b82f6)',
    },
    {
      name: 'Over 35',
      count: stats?.ageDistribution?.over35 ?? 0,
      fill: 'var(--chart-4, #10b981)',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Dashboard Overview
            </h1>
            <Badge variant="info" className="text-xs px-2 py-0.5">Live Data</Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Real-time management metrics powered by React, Express, Prisma, and PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            disabled={isLoading}
            className="rounded-xl gap-2 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Button asChild size="sm" className="rounded-xl gap-2 font-bold shadow-sm shadow-primary/25">
            <Link to="/users/new">
              <UserPlus className="h-4 w-4" />
              <span>Add New User</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div className="flex-grow">
            <h4 className="text-sm font-bold">Failed to connect to backend server</h4>
            <p className="text-xs opacity-90 mt-0.5">{error}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            className="text-xs font-bold"
          >
            Retry
          </Button>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={isLoading ? '...' : (stats?.totalUsers ?? 0)}
          subtitle="Registered in PostgreSQL"
          icon={Users}
          badge="Active"
          color="indigo"
        />
        <StatsCard
          title="Average Age"
          value={isLoading ? '...' : (stats?.averageAge ? `${stats.averageAge} yrs` : '—')}
          subtitle="Cohort average"
          icon={Calendar}
          badge="Demographic"
          color="blue"
        />
        <StatsCard
          title="Recent Additions"
          value={isLoading ? '...' : (stats?.recentUsers?.length ?? 0)}
          subtitle="Latest registrations"
          icon={UserPlus}
          badge="Recent"
          color="emerald"
        />
        <StatsCard
          title="Database Status"
          value={isLoading ? 'Checking...' : (stats?.database?.connected ? 'Online' : 'Fallback Store')}
          subtitle={stats?.database?.provider || 'PostgreSQL / Prisma'}
          icon={Database}
          badge="Healthy"
          color="amber"
        />
      </div>

      {/* Shadcn Tabs: Overview vs System Diagnostics */}
      <Tabs defaultValue="analytics" className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <TabsList className="rounded-xl p-1 bg-muted/60">
            <TabsTrigger value="analytics" className="rounded-lg text-xs gap-1.5 font-bold">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Analytics & Users</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="rounded-lg text-xs gap-1.5 font-bold">
              <Layers className="h-3.5 w-3.5" />
              <span>Full-Stack Architecture</span>
            </TabsTrigger>
          </TabsList>

          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            PostgreSQL • Prisma ORM • Express REST API
          </span>
        </div>

        {/* Tab 1: Analytics & Users */}
        <TabsContent value="analytics" className="space-y-6 m-0">
          
          {/* Main 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Recently Added Users Table */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle className="text-base font-bold">Recently Registered Users</CardTitle>
                  <CardDescription className="text-xs">
                    Latest user profiles stored in the PostgreSQL database
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs text-primary gap-1 group">
                  <Link to="/users">
                    <span>View all</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-12 text-center text-muted-foreground">
                    <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs">Loading records...</p>
                  </div>
                ) : !stats?.recentUsers || stats.recentUsers.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-semibold text-foreground">No users registered yet</p>
                    <p className="text-xs mt-1">Get started by creating your first profile.</p>
                    <Button asChild size="sm" className="mt-4 text-xs">
                      <Link to="/users/new">Add First User</Link>
                    </Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-muted/20">
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.recentUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/20 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground font-bold text-xs">
                                  {getInitials(user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <Link
                                  to={`/users/${user.id}`}
                                  className="font-semibold text-xs text-foreground hover:text-primary truncate block"
                                >
                                  {user.name}
                                </Link>
                                <span className="text-[11px] text-muted-foreground truncate block">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-semibold">
                            <Badge variant="secondary" className="text-[11px] font-semibold">
                              {user.age} yrs
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button asChild variant="outline" size="sm" className="h-7 text-xs px-2.5">
                              <Link to={`/users/${user.id}`}>View</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Right 1 Col: Data Visualization Chart */}
            <div className="space-y-6">
              
              {/* Age Distribution Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-bold">Age Demographics</CardTitle>
                    <Badge variant="outline" className="text-[10px]">Recharts</Badge>
                  </div>
                  <CardDescription className="text-xs">
                    Users grouped by age cohorts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ageChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            color: 'var(--card-foreground)',
                            borderRadius: 'var(--radius)',
                            border: '1px solid var(--border)',
                            fontSize: '12px',
                            boxShadow: 'var(--shadow-md)',
                          }}
                        />
                        <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Users">
                          {ageChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Summary counts */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t mt-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-muted/40">
                      <p className="text-[10px] text-muted-foreground font-semibold">Under 25</p>
                      <p className="text-sm font-extrabold text-primary">{stats?.ageDistribution?.under25 ?? 0}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-muted/40">
                      <p className="text-[10px] text-muted-foreground font-semibold">25 - 35</p>
                      <p className="text-sm font-extrabold text-blue-600">{stats?.ageDistribution?.age25to35 ?? 0}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-muted/40">
                      <p className="text-[10px] text-muted-foreground font-semibold">Over 35</p>
                      <p className="text-sm font-extrabold text-emerald-600">{stats?.ageDistribution?.over35 ?? 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Action Card */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <CardTitle className="text-sm font-bold text-white">Quick Action</CardTitle>
                  </div>
                  <CardDescription className="text-xs text-primary-foreground/80">
                    Need to add another team member or test validation?
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs font-bold rounded-xl text-primary bg-white hover:bg-white/90"
                  >
                    <Link to="/users/new">Create New User Profile</Link>
                  </Button>
                </CardContent>
              </Card>

            </div>

          </div>

        </TabsContent>

        {/* Tab 2: Full-Stack Architecture */}
        <TabsContent value="architecture" className="space-y-6 m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-bold">Multi-Tier Data Lifecycle</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  How every CRUD action travels through UserHub
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-xl border bg-muted/30 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-cyan-500/10 text-cyan-600 font-bold flex items-center justify-center shrink-0">1</div>
                  <div>
                    <strong className="text-foreground">Client UI Tier (React + Vite + Tailwind):</strong>
                    <p className="text-muted-foreground mt-0.5">Captures form submissions, executes real-time validation, and initiates HTTP requests via Axios.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/30 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center shrink-0">2</div>
                  <div>
                    <strong className="text-foreground">API Application Tier (Express REST Server):</strong>
                    <p className="text-muted-foreground mt-0.5">Handles CORS, parses JSON payloads, checks input rules via middleware, and coordinates controller logic.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/30 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-purple-500/10 text-purple-600 font-bold flex items-center justify-center shrink-0">3</div>
                  <div>
                    <strong className="text-foreground">Data Layer (Prisma ORM):</strong>
                    <p className="text-muted-foreground mt-0.5">Translates JavaScript object operations into safe parameterized SQL queries preventing SQL injections.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl border bg-muted/30 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-lg bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center shrink-0">4</div>
                  <div>
                    <strong className="text-foreground">Database Persistence (PostgreSQL):</strong>
                    <p className="text-muted-foreground mt-0.5">Enforces unique email constraints, primary key generation, and ACID transactions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-base font-bold">API Specifications</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Active REST endpoints exposed on port 5000
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-emerald-600">GET</strong> /api/health</span>
                  <Badge variant="outline" className="text-[10px]">Health Check</Badge>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-emerald-600">GET</strong> /api/users/stats</span>
                  <Badge variant="outline" className="text-[10px]">Dashboard KPIs</Badge>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-emerald-600">GET</strong> /api/users</span>
                  <Badge variant="outline" className="text-[10px]">Search & Filter</Badge>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-blue-600">POST</strong> /api/users</span>
                  <Badge variant="outline" className="text-[10px]">Create Profile</Badge>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-amber-600">PUT</strong> /api/users/:id</span>
                  <Badge variant="outline" className="text-[10px]">Update Profile</Badge>
                </div>
                <div className="p-2.5 rounded-lg border bg-muted/20 flex items-center justify-between">
                  <span><strong className="text-rose-600">DELETE</strong> /api/users/:id</span>
                  <Badge variant="outline" className="text-[10px]">Permanent Delete</Badge>
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default Dashboard;
