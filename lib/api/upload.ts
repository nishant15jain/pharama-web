import apiClient from './client';
import { UploadResponse } from './types';

export const uploadApi = {
  /**
   * Upload an image file to S3
   */
  uploadImage: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<UploadResponse>('/api/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

