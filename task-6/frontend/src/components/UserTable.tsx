import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, MoreVertical, Mail, Phone, Calendar, User as UserIcon } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onDeleteClick: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  onDeleteClick,
}) => {
  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-card p-12 text-center shadow-xs">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-semibold text-muted-foreground">Querying records from PostgreSQL...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-12 text-center shadow-xs max-w-lg mx-auto">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
          <UserIcon className="h-6 w-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">No Users Found</h3>
        <p className="text-xs text-muted-foreground mt-1 mb-4 leading-relaxed">
          No registered user profiles matched your current search keywords or filters.
        </p>
        <Button asChild size="sm" className="rounded-xl">
          <Link to="/users/new">Register New User</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[280px]">User Profile</TableHead>
            <TableHead>Contact Info</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
              
              {/* Profile / Avatar + Name */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground font-bold text-xs">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <Link
                      to={`/users/${user.id}`}
                      className="font-bold text-sm text-foreground hover:text-primary transition-colors block truncate"
                    >
                      {user.name}
                    </Link>
                    <span className="text-xs text-muted-foreground block truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Contact Info */}
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-foreground">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.phone ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{user.phone}</span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-muted-foreground italic">No phone</span>
                  )}
                </div>
              </TableCell>

              {/* Age */}
              <TableCell>
                <Badge variant="secondary" className="font-semibold text-xs">
                  {user.age} yrs
                </Badge>
              </TableCell>

              {/* Registration Date */}
              <TableCell>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
              </TableCell>

              {/* Action Buttons & Dropdown */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="hover:text-primary"
                    title="View details"
                  >
                    <Link to={`/users/${user.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    size="icon-sm"
                    className="hover:text-primary"
                    title="Edit profile"
                  >
                    <Link to={`/users/${user.id}/edit`}>
                      <Edit2 className="h-4 w-4" />
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="More actions">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem asChild>
                        <Link to={`/users/${user.id}`} className="cursor-pointer">
                          <Eye className="mr-2 h-3.5 w-3.5" />
                          <span>View Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to={`/users/${user.id}/edit`} className="cursor-pointer">
                          <Edit2 className="mr-2 h-3.5 w-3.5" />
                          <span>Edit Details</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDeleteClick(user)}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        <span>Delete User</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
