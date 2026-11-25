import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit3, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import UserForm from '@/components/UserForm';
import { getUserById, updateUser } from '@/services/userService';
import { User, UserFormData } from '@/types/user';

export const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExistingUser = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        setFetchError(null);
        const response = await getUserById(id);
        if (response && response.data) {
          setInitialData(response.data);
        } else {
          throw new Error('User record could not be found.');
        }
      } catch (err: any) {
        console.error('Failed to load user for editing:', err);
        setFetchError(err.response?.data?.message || err.message || 'Unable to retrieve user record.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingUser();
  }, [id]);

  const handleSubmit = async (formData: UserFormData) => {
    if (!id) return;
    try {
      setIsSubmitting(true);
      setServerError(null);

      const response = await updateUser(id, formData);

      if (response && response.success) {
        navigate('/users', {
          state: { message: `Profile for "${formData.name}" was successfully updated in PostgreSQL!` },
        });
      } else {
        throw new Error(response?.message || 'Failed to update user profile.');
      }
    } catch (err: any) {
      console.error('Error updating user:', err);
      if (err.response?.status === 409) {
        setServerError('A different user is already registered with this email address.');
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorList = Object.values(err.response.data.errors).join(', ');
        setServerError(`Validation error: ${errorList}`);
      } else {
        setServerError(err.message || 'Network error occurred while submitting update.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <h3 className="text-base font-bold text-foreground">Loading User Details...</h3>
        <p className="text-xs text-muted-foreground mt-1">Fetching profile data for editing</p>
      </div>
    );
  }

  if (fetchError || !initialData) {
    return (
      <div className="max-w-md mx-auto my-12 text-center">
        <Card className="p-8">
          <div className="h-12 w-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">Unable to Edit User</h3>
          <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
            {fetchError || `The user profile with ID #${id} could not be found.`}
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
      
      {/* Back button & Header */}
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2 group -ml-2"
        >
          <Link to={`/users/${id}`}>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Profile Details</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <Edit3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Edit User Profile
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Updating record for <strong className="text-foreground">{initialData.name}</strong> (ID: #{initialData.id})
            </p>
          </div>
        </div>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-grow">
            <h4 className="text-sm font-bold">Update Failed</h4>
            <p className="text-xs opacity-90 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Form + Sidecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Container */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Update User Fields</CardTitle>
            <CardDescription className="text-xs">
              Make changes below and click save to apply updates to PostgreSQL.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm
              initialData={initialData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitButtonText="Save Changes"
            />
          </CardContent>
        </Card>

        {/* Informational Sidecard */}
        <div className="space-y-4">
          <Card className="shadow-xs bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Update Safeguards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-muted-foreground leading-relaxed pt-0">
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Unique Email Check:</strong> You may keep the existing email, but changing to an email owned by another user is blocked by Prisma constraints.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Automatic Timestamp:</strong> PostgreSQL automatically updates <code>updatedAt</code> on this row.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-slate-100 shadow-sm border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-white">Database Query</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1 text-xs text-indigo-200 font-mono text-[11px] pt-0">
              <p>prisma.user.update(&#123;</p>
              <p>&nbsp;&nbsp;where: &#123; id: {id} &#125;,</p>
              <p>&nbsp;&nbsp;data: &#123; ...fields &#125;</p>
              <p>&#125;)</p>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default EditUser;
