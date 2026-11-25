import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, Mail, Phone, Calendar, MoreVertical } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
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

interface UserCardProps {
  user: User;
  onDeleteClick: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDeleteClick }) => {
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

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardHeader className="p-4 pb-3 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-11 w-11">
            <AvatarFallback className="bg-gradient-to-tr from-primary to-primary/70 text-primary-foreground font-bold text-sm">
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="h-8 w-8 -mr-1">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem asChild>
              <Link to={`/users/${user.id}`} className="cursor-pointer">
                <Eye className="mr-2 h-3.5 w-3.5" />
                <span>View</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/users/${user.id}/edit`} className="cursor-pointer">
                <Edit2 className="mr-2 h-3.5 w-3.5" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDeleteClick(user)}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Age Demographic:</span>
          <Badge variant="secondary" className="font-semibold text-xs">
            {user.age} years old
          </Badge>
        </div>

        {user.phone && (
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Phone:</span>
            <a href={`tel:${user.phone}`} className="text-primary hover:underline font-medium">
              {user.phone}
            </a>
          </div>
        )}

        <div className="flex items-center justify-between text-muted-foreground">
          <span>Registered:</span>
          <span>{formatDate(user.createdAt)}</span>
        </div>

        {user.bio && (
          <p className="text-[11px] text-muted-foreground bg-muted/40 p-2.5 rounded-xl line-clamp-2 italic">
            "{user.bio}"
          </p>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-muted/20 border-t flex items-center justify-between gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1 text-xs h-8">
          <Link to={`/users/${user.id}`}>
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            <span>Profile</span>
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="flex-1 text-xs h-8">
          <Link to={`/users/${user.id}/edit`}>
            <Edit2 className="mr-1.5 h-3.5 w-3.5" />
            <span>Edit</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onDeleteClick(user)}
          className="h-8 w-8 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
