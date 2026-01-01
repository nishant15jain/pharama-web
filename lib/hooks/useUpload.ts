'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadApi, UploadResponse, ApiError } from '../api';

/**
 * Hook to upload an image to S3
 */
export function useUploadImage() {
  return useMutation<UploadResponse, ApiError, File>({
    mutationFn: (file) => uploadApi.uploadImage(file),
  });
}

