import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserPlus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Users as UsersIcon,
  LayoutGrid,
  Table as TableIcon,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserTable from '@/components/UserTable';
import UserCard from '@/components/UserCard';
import SearchBar from '@/components/SearchBar';
import DeleteModal from '@/components/DeleteModal';
import { getUsers, deleteUser } from '@/services/userService';
import { User, GetUsersParams } from '@/types/user';

export const UsersPage: React.FC = () => {
  const location = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minAge, setMinAge] = useState<string>('');
  const [maxAge, setMaxAge] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Delete modal state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Read URL query params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params: GetUsersParams = {};
      if (searchTerm.trim()) params.search = searchTerm.trim();
      if (minAge) params.minAge = minAge;
      if (maxAge) params.maxAge = maxAge;
      if (sortBy) params.sortBy = sortBy as any;

      const response = await getUsers(params);
      if (response && response.data) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || err.message || 'Failed to retrieve users from PostgreSQL.');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, minAge, maxAge, sortBy]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(handler);
  }, [fetchUsers]);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      setIsDeleting(true);
      await deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      showNotification(`User "${selectedUser.name}" was permanently removed from PostgreSQL.`);
      setSelectedUser(null);
      fetchUsers();
    } catch (err: any) {
      console.error('Failed to delete user:', err);
      showNotification(
        err.response?.data?.message || 'Failed to delete user record.',
        'error'
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setMinAge('');
    setMaxAge('');
    setSortBy('createdAt');
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 ${
            notification.type === 'error'
              ? 'bg-destructive text-destructive-foreground shadow-destructive/30'
              : 'bg-emerald-600 text-white shadow-emerald-600/30'
          }`}
          role="status"
        >
          {notification.type === 'error' ? (
            <AlertCircle className="h-5 w-5 shrink-0" />
          ) : (
            <CheckCircle2 className="h-5 w-5 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Users Management
            </h1>
            <Badge variant="secondary" className="font-bold text-xs px-2.5 py-0.5">
              {users.length} {users.length === 1 ? 'Record' : 'Records'}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Browse, search, edit, and organize user profiles persisted in PostgreSQL.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Table / Grid view switcher */}
          <div className="hidden sm:flex items-center border rounded-xl p-1 bg-card shadow-2xs">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => setViewMode('table')}
              className="h-8 w-8 rounded-lg"
              title="Table view"
              aria-label="Table view"
            >
              <TableIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon-sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 rounded-lg"
              title="Grid view"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={isLoading}
            className="rounded-xl gap-2 text-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button asChild size="sm" className="rounded-xl gap-2 font-bold shadow-sm shadow-primary/25">
            <Link to="/users/new">
              <UserPlus className="h-4 w-4" />
              <span>Add User</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-grow">
            <h4 className="text-sm font-bold">Failed to load users</h4>
            <p className="text-xs opacity-90 mt-0.5">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchUsers}>
            Retry
          </Button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        minAge={minAge}
        maxAge={maxAge}
        onMinAgeChange={setMinAge}
        onMaxAgeChange={setMaxAge}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalResults={users.length}
      />

      {/* Table View (Desktop) */}
      {viewMode === 'table' ? (
        <div className="hidden md:block">
          <UserTable
            users={users}
            isLoading={isLoading}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      ) : null}

      {/* Grid View (Desktop and Mobile) */}
      <div className={viewMode === 'table' ? 'md:hidden space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'}>
        {isLoading ? (
          <div className="col-span-full rounded-2xl border bg-card p-12 text-center">
            <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">Loading records...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="col-span-full rounded-2xl border bg-card p-12 text-center">
            <UsersIcon className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
            <h3 className="text-base font-bold text-foreground">No users found</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Try adjusting your search query or age filter limits.
            </p>
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDeleteClick={handleDeleteClick}
            />
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        user={selectedUser}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  );
};

export default UsersPage;
