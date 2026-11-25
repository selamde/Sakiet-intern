/**
 * ============================================================================
 * Centralized API Service: userService.ts
 * ============================================================================
 * Handles all HTTP communication with the Express REST API using Axios.
 * Completely typed with TypeScript to ensure type safety across frontend views.
 * ============================================================================
 */

import axios, { AxiosInstance } from 'axios';
import {
  User,
  UserFormData,
  DashboardStats,
  ApiResponse,
  HealthStatusResponse,
  GetUsersParams
} from '@/types/user';

// Base API URL configured from environment variable (.env) or fallback to localhost
const API_BASE_URL: string = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create a pre-configured Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10-second timeout
});

/**
 * Fetch all users with optional query parameters (search, minAge, maxAge, sorting)
 */
export const getUsers = async (params: GetUsersParams = {}): Promise<ApiResponse<User[]>> => {
  const response = await apiClient.get<ApiResponse<User[]>>('/users', { params });
  return response.data;
};

/**
 * Fetch a single user profile by ID
 */
export const getUserById = async (id: number | string): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
  return response.data;
};

/**
 * Create a new user profile
 */
export const createUser = async (userData: UserFormData): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', userData);
  return response.data;
};

/**
 * Update an existing user profile by ID
 */
export const updateUser = async (
  id: number | string,
  userData: Partial<UserFormData>
): Promise<ApiResponse<User>> => {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
  return response.data;
};

/**
 * Delete a user profile by ID
 */
export const deleteUser = async (id: number | string): Promise<ApiResponse<{ id: number; name: string }>> => {
  const response = await apiClient.delete<ApiResponse<{ id: number; name: string }>>(`/users/${id}`);
  return response.data;
};

/**
 * Retrieve dashboard statistics (total users, age distribution, recent signups, system status)
 */
export const getDashboardStats = async (): Promise<ApiResponse<DashboardStats>> => {
  const response = await apiClient.get<ApiResponse<DashboardStats>>('/users/stats');
  return response.data;
};

/**
 * Verify backend and database health status
 */
export const checkHealth = async (): Promise<HealthStatusResponse> => {
  const response = await apiClient.get<HealthStatusResponse>('/health');
  return response.data;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getDashboardStats,
  checkHealth,
};
