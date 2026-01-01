import apiClient from './client';
import { Product, CreateProductRequest, UpdateProductRequest } from './types';

export const productsApi = {
  /**
   * Get all products
   */
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/api/admin/products');
    return response.data;
  },

  /**
   * Get a single product by ID
   */
  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/api/admin/products/${id}`);
    return response.data;
  },

  /**
   * Create a new product
   */
  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>('/api/admin/products', data);
    return response.data;
  },

  /**
   * Update an existing product
   */
  update: async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const response = await apiClient.put<Product>(`/api/admin/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete a product
   */
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/admin/products/${id}`);
  },
};

