import apiClient from './client';
import { LoginRequest, LoginResponse } from './types';

export const authApi = {
  /**
   * Admin login
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
    return response.data;
  },

  /**
   * Logout - clears local storage
   */
  logout: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('admin_token');
    }
    return false;
  },

  /**
   * Get stored user info
   */
  getStoredUser: (): { name: string; role: string } | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('admin_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  /**
   * Store auth data after successful login
   */
  storeAuthData: (response: LoginResponse): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify({
        name: response.name,
        role: response.role,
      }));
    }
  },
};

