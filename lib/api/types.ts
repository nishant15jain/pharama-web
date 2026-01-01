// API Response Types

export interface ErrorResponse {
  status: number;
  message: string;
  timestamp: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  errors: Record<string, string>;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  name: string;
}

// Product Types
export interface Product {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  imageUrl?: string;
}

// Upload Types
export interface UploadResponse {
  url: string;
}

// API Error Type
export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(message: string, status: number, errors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

