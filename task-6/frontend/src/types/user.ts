/**
 * UserHub TypeScript Type Definitions
 */

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  phone?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  age: number;
  phone?: string | null;
  bio?: string | null;
}

export interface AgeDistribution {
  under25: number;
  age25to35: number;
  over35: number;
}

export interface DatabaseStatus {
  connected: boolean;
  provider: string;
}

export interface DashboardStats {
  totalUsers: number;
  averageAge: number;
  recentUsers: User[];
  ageDistribution: AgeDistribution;
  database: DatabaseStatus;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  errors?: Record<string, string>;
}

export interface HealthStatusResponse {
  success: boolean;
  message: string;
  status: string;
  database: DatabaseStatus;
  timestamp: string;
}

export interface GetUsersParams {
  search?: string;
  minAge?: number | string;
  maxAge?: number | string;
  sortBy?: 'createdAt' | 'name' | 'age' | 'email';
  sortOrder?: 'asc' | 'desc';
}
