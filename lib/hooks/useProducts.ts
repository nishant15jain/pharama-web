'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi, Product, CreateProductRequest, UpdateProductRequest, ApiError } from '../api';

export const PRODUCT_QUERY_KEYS = {
  all: ['products'] as const,
  lists: () => [...PRODUCT_QUERY_KEYS.all, 'list'] as const,
  list: () => [...PRODUCT_QUERY_KEYS.lists()] as const,
  details: () => [...PRODUCT_QUERY_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...PRODUCT_QUERY_KEYS.details(), id] as const,
};

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery<Product[], ApiError>({
    queryKey: PRODUCT_QUERY_KEYS.list(),
    queryFn: () => productsApi.getAll(),
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: number) {
  return useQuery<Product, ApiError>({
    queryKey: PRODUCT_QUERY_KEYS.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, ApiError, CreateProductRequest>({
    mutationFn: (data) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to update an existing product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, ApiError, { id: number; data: UpdateProductRequest }>({
    mutationFn: ({ id, data }) => productsApi.update(id, data),
    onSuccess: (data, variables) => {
      // Update the specific product in cache
      queryClient.setQueryData(PRODUCT_QUERY_KEYS.detail(variables.id), data);
      // Invalidate list to refetch
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
    },
  });
}

/**
 * Hook to delete a product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, number>({
    mutationFn: (id) => productsApi.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: PRODUCT_QUERY_KEYS.detail(deletedId) });
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: PRODUCT_QUERY_KEYS.lists() });
    },
  });
}

