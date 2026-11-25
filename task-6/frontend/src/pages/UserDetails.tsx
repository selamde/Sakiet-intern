import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Code2,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import DeleteModal from '@/components/DeleteModal';
import { getUserById, deleteUser } from '@/services/userService';
import { User } from '@/types/user';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showJson, setShowJson] = useState<boolean>(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setError(null);
        const response = await getUserById(id);
        if (response && response.data) {
          setUser(response.data);
        } else {
          throw new Error('User record could not be found.');
        }
      } catch (err: any) {
        console.error('Error fetching user details:', err);
        setError(err.response?.data?.message || err.message || 'User does not exist or has been deleted.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleCopyEmail = () => {
    if (user?.email) {
      navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfirmDelete = async () => {
    if (!user) return;
    try {
      setIsDeleting(true);
      await deleteUser(user.id);
      setIsDeleteModalOpen(false);
      navigate('/users', {
        state: { message: `User "${user.name}" was permanently removed from PostgreSQL.` },
      });
    } catch (err: any) {
      console.error('Error deleting user:', err);
      alert(err.response?.data?.message || 'Failed to delete user.');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <h3 className="text-base font-bold text-foreground">Loading User Record...</h3>
        <p className="text-xs text-muted-foreground mt-1">Retrieving details from PostgreSQL via Prisma</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-md mx-auto my-12 text-center">
        <Card className="p-8">
          <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">User Not Found</h3>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            {error || `The user profile with ID #${id} does not exist.`}
          </p>
          <Button asChild size="sm" className="rounded-xl">
            <Link to="/users">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Back to Users</span>
            </Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 group -ml-2"
          >
            <Link to="/users">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back to Users Directory</span>
            </Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            User Profile Record
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outline" size="sm" className="rounded-xl gap-2 text-xs">
            <Link to={`/users/${user.id}/edit`}>
              <Edit2 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded-xl gap-2 text-xs"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Delete User</span>
          </Button>
        </div>
      </div>

      {/* Main Profile Card */}
      <Card className="overflow-hidden shadow-sm">
        
        {/* Banner with gradient */}
        <div className="h-32 bg-gradient-to-r from-primary via-primary/85 to-primary/65 relative">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/20 text-white backdrop-blur-md border-white/30 text-xs font-mono font-bold">
              PostgreSQL ID: #{user.id}
            </Badge>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          
          {/* Avatar and status */}
          <div className="-mt-14 mb-4 flex items-end justify-between">
            <Avatar className="h-24 w-24 ring-4 ring-card shadow-lg">
              <AvatarFallback className="bg-gradient-to-tr from-primary to-primary/75 text-primary-foreground font-black text-2xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Badge variant="success" className="gap-1.5 px-3 py-1 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Active Database Record</span>
            </Badge>
          </div>

          {/* Name & Bio */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user.bio ? user.bio : 'No personal biography specified.'}
            </p>
          </div>

          <Separator className="my-4" />

          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Email */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  Email Address
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleCopyEmail}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <p className="text-sm font-semibold text-foreground break-all">{user.email}</p>
            </div>

            {/* Age */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                Age
              </span>
              <p className="text-sm font-semibold text-foreground">
                {user.age} <span className="text-xs font-normal text-muted-foreground">years old</span>
              </p>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Phone Number
              </span>
              <p className="text-sm font-semibold text-foreground">
                {user.phone ? (
                  <a href={`tel:${user.phone}`} className="text-primary hover:underline">
                    {user.phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground font-normal italic">Not provided</span>
                )}
              </p>
            </div>

            {/* Primary Key */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                Primary Key
              </span>
              <p className="text-sm font-mono font-semibold text-foreground">
                User.id = {user.id}
              </p>
            </div>

            {/* Created At */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Registration Timestamp
              </span>
              <p className="text-xs font-semibold text-foreground">
                {formatDate(user.createdAt)}
              </p>
            </div>

            {/* Updated At */}
            <div className="p-4 rounded-xl border bg-muted/20 space-y-1">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                Last Updated Timestamp
              </span>
              <p className="text-xs font-semibold text-foreground">
                {formatDate(user.updatedAt)}
              </p>
            </div>

          </div>

          {/* Raw JSON toggle */}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowJson(!showJson)}
              className="gap-2 text-xs"
            >
              <Code2 className="h-4 w-4" />
              <span>{showJson ? 'Hide Raw API JSON' : 'Inspect Raw API JSON'}</span>
            </Button>

            {showJson && (
              <pre className="mt-3 p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                {JSON.stringify(user, null, 2)}
              </pre>
            )}
          </div>

        </div>

      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        user={user}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

    </div>
  );
};

export default UserDetails;
