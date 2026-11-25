import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Calendar, Phone, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User, UserFormData } from '@/types/user';

interface UserFormProps {
  initialData?: User | null;
  onSubmit: (formData: UserFormData) => void;
  isSubmitting: boolean;
  submitButtonText?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText = "Save User Record",
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    bio: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        age: initialData.age !== undefined ? String(initialData.age) : '',
        phone: initialData.phone || '',
        bio: initialData.bio || '',
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must contain at least 2 characters.';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required.';
    } else {
      const parsedAge = Number(formData.age);
      if (!Number.isInteger(parsedAge) || parsedAge <= 0 || parsedAge > 120) {
        newErrors.age = 'Age must be a positive whole integer between 1 and 120.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: formData.name.trim(),
      email: formData.email.trim(),
      age: Number(formData.age),
      phone: formData.phone.trim() || null,
      bio: formData.bio.trim() || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      
      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-1">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Abebe Kebede"
            className={`pl-10 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            disabled={isSubmitting}
          />
        </div>
        {errors.name && (
          <p className="text-xs font-semibold text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.name}</span>
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-1">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. abebe@example.com"
            className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            disabled={isSubmitting}
          />
        </div>
        {errors.email && (
          <p className="text-xs font-semibold text-destructive flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Age & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-1">
            Age <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="age"
              name="age"
              type="number"
              min="1"
              max="120"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g. 24"
              className={`pl-10 ${errors.age ? 'border-destructive focus-visible:ring-destructive' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.age && (
            <p className="text-xs font-semibold text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>{errors.age}</span>
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-[10px] text-muted-foreground normal-case">(Optional)</span>
          </Label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +251 91 234 5678"
              className="pl-10"
              disabled={isSubmitting}
            />
          </div>
        </div>

      </div>

      {/* Short Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">
          Short Bio <span className="text-[10px] text-muted-foreground normal-case">(Optional)</span>
        </Label>
        <Textarea
          id="bio"
          name="bio"
          rows={3}
          value={formData.bio}
          onChange={handleChange}
          placeholder="Brief summary of professional background, skills, or responsibilities..."
          disabled={isSubmitting}
          className="resize-none"
        />
        <p className="text-[11px] text-muted-foreground">
          Maximum 250 characters recommended.
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-[160px] rounded-xl gap-2 font-bold shadow-md shadow-primary/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Saving to PostgreSQL...</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              <span>{submitButtonText}</span>
            </>
          )}
        </Button>
      </div>

    </form>
  );
};

export default UserForm;
