'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi, LoginRequest, LoginResponse, ApiError } from '../api';

export const AUTH_QUERY_KEYS = {
  user: ['auth', 'user'] as const,
};

/**
 * Hook for admin login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, ApiError, LoginRequest>({
    mutationFn: (credentials) => authApi.login(credentials),
    onSuccess: (data) => {
      authApi.storeAuthData(data);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user });
      router.push('/admin');
    },
  });
}

/**
 * Hook for admin logout
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      authApi.logout();
    },
    onSuccess: () => {
      queryClient.clear();
      router.push('/admin/login');
    },
  });
}

/**
 * Get current auth state (client-side only)
 */
export function useAuthState() {
  const isAuthenticated = authApi.isAuthenticated();
  const user = authApi.getStoredUser();

  return {
    isAuthenticated,
    user,
  };
}

