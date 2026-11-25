import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import UserForm from '@/components/UserForm';
import { createUser } from '@/services/userService';
import { UserFormData } from '@/types/user';

export const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (formData: UserFormData) => {
    try {
      setIsSubmitting(true);
      setServerError(null);

      const response = await createUser(formData);

      if (response && response.success) {
        navigate('/users', {
          state: { message: `User "${formData.name}" was successfully registered in PostgreSQL!` },
        });
      } else {
        throw new Error(response?.message || 'Failed to create user record.');
      }
    } catch (err: any) {
      console.error('Error creating user:', err);
      if (err.response?.status === 409) {
        setServerError('A user with this email address already exists. Please choose a unique email.');
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        const errorList = Object.values(err.response.data.errors).join(', ');
        setServerError(`Validation error: ${errorList}`);
      } else {
        setServerError(err.message || 'Network error occurred while connecting to the backend.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Link to="/users">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Users Directory</span>
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserPlus className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Create New User Profile
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Fill in the user details below to execute an INSERT into PostgreSQL via Prisma ORM.
            </p>
          </div>
        </div>
      </div>

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div className="flex-grow">
            <h4 className="text-sm font-bold">Registration Blocked</h4>
            <p className="text-xs opacity-90 mt-0.5">{serverError}</p>
          </div>
        </div>
      )}

      {/* Form + Sidecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Container */}
        <Card className="lg:col-span-2 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">User Information</CardTitle>
            <CardDescription className="text-xs">
              All required fields marked with an asterisk (*)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitButtonText="Create User Profile"
            />
          </CardContent>
        </Card>

        {/* Informational Sidecard */}
        <div className="space-y-4">
          <Card className="shadow-xs bg-muted/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <CardTitle className="text-xs font-bold uppercase tracking-wider">Validation Criteria</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs text-muted-foreground leading-relaxed pt-0">
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span><strong>Name:</strong> Required, 2+ characters.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span><strong>Email:</strong> Must be valid and strictly unique in PostgreSQL.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span><strong>Age:</strong> Whole positive number between 1 and 120.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span><strong>Phone & Bio:</strong> Optional profile enrichment fields.</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground shadow-sm border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-white">Full-Stack Flow</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-primary-foreground/90 pt-0">
              <p>On submission:</p>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-primary-foreground/80 font-mono">
                <li>React checks fields</li>
                <li>Axios POST /api/users</li>
                <li>Express validateUser</li>
                <li>Prisma user.create()</li>
                <li>PostgreSQL INSERT</li>
                <li>HTTP 201 Created</li>
              </ol>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default AddUser;
