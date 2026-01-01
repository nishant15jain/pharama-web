'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, useUploadImage, useLogout, useAuthState } from '@/lib/hooks';
import { Product } from '@/lib/api';

export default function AdminPage() {
  const { user } = useAuthState();
  const logoutMutation = useLogout();
  
  // Product hooks
  const { data: products, isLoading: isLoadingProducts, error: productsError } = useProducts();
  const createProductMutation = useCreateProduct();
  const deleteProductMutation = useDeleteProduct();
  const uploadImageMutation = useUploadImage();

  // Form state
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  // Drag state
  const [dragActive, setDragActive] = useState(false);

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleImageUpload = useCallback(async (file: File) => {
    try {
      const result = await uploadImageMutation.mutateAsync(file);
      setUploadedImageUrl(result.url);
      setUploadedFileName(file.name);
      toast.success('Image uploaded successfully!');
    } catch {
      toast.error('Failed to upload image. Please try again.');
    }
  }, [uploadImageMutation]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim()) return;

    try {
      await createProductMutation.mutateAsync({
        name: productName,
        description: productDescription || undefined,
        imageUrl: uploadedImageUrl || undefined,
      });
      
      // Show success toast
      toast.success(`Product "${productName}" created successfully!`);
      
      // Reset form
      setProductName('');
      setProductDescription('');
      setUploadedImageUrl(null);
      setUploadedFileName(null);
    } catch {
      // Show error toast
      toast.error('Failed to create product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(id, {
        onSuccess: () => {
          toast.success('Product deleted successfully!');
        },
        onError: () => {
          toast.error('Failed to delete product. Please try again.');
        },
      });
    }
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const removeUploadedImage = () => {
    setUploadedImageUrl(null);
    setUploadedFileName(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative py-12 sm:py-16 overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 pattern-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
              </div>
              <p className="text-muted">Welcome back, {user?.name || 'Admin'}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System Online
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 text-red-600 rounded-full text-sm font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Product
                </h2>
                <p className="text-muted text-sm mt-1">Upload product image and add details</p>
              </div>
              
              <form onSubmit={handleCreateProduct} className="p-6">

                {/* Drag & Drop Zone */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  } ${uploadImageMutation.isPending ? 'opacity-50 pointer-events-none' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploadImageMutation.isPending}
                  />
                  
                  {uploadImageMutation.isPending ? (
                    <div className="flex flex-col items-center">
                      <svg className="animate-spin h-12 w-12 text-primary mb-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <p className="font-medium">Uploading image...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="font-medium mb-1">
                        Drop image here or <span className="text-primary">browse</span>
                      </p>
                      <p className="text-sm text-muted">Supports JPG, PNG, WEBP, GIF up to 5MB</p>
                    </>
                  )}
                </div>

                {/* Uploaded Image Preview */}
                {uploadedImageUrl && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Image Uploaded
                    </h4>
                    <div className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-primary/10">
                          <Image
                            src={uploadedImageUrl}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium truncate max-w-[200px]">{uploadedFileName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeUploadedImage}
                        className="p-1 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Product Form */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter product name..."
                      required
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Enter product description..."
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={createProductMutation.isPending || !productName.trim()}
                    className="w-full btn-primary py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {createProductMutation.isPending ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating...
                      </>
                    ) : (
                      'Add Product'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Products */}
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Products ({products?.length || 0})
                </h2>
                <p className="text-muted text-sm mt-1">Manage your product catalog</p>
              </div>
              
              {/* Loading State */}
              {isLoadingProducts && (
                <div className="p-8 text-center">
                  <svg className="animate-spin h-8 w-8 text-primary mx-auto mb-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <p className="text-muted">Loading products...</p>
                </div>
              )}

              {/* Error State */}
              {productsError && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-500 font-medium">Failed to load products</p>
                  <p className="text-muted text-sm mt-1">{productsError.message}</p>
                </div>
              )}

              {/* Empty State */}
              {!isLoadingProducts && !productsError && products?.length === 0 && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="font-medium">No products yet</p>
                  <p className="text-muted text-sm mt-1">Add your first product using the form above</p>
                </div>
              )}

              {/* Products List */}
              {!isLoadingProducts && !productsError && products && products.length > 0 && (
                <div className="divide-y divide-border/50">
                  {products.map((product) => (
                    <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex-shrink-0">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium truncate">{product.name}</h3>
                        <p className="text-muted text-sm truncate">{product.description || 'No description'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deleteProductMutation.isPending}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Total Products", value: products?.length || 0, icon: "📦", color: "primary" },
                  { label: "With Images", value: products?.filter(p => p.imageUrl).length || 0, icon: "🖼️", color: "green" },
                  { label: "Without Images", value: products?.filter(p => !p.imageUrl).length || 0, icon: "⚠️", color: "yellow" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{stat.icon}</span>
                      <span className="text-sm text-muted">{stat.label}</span>
                    </div>
                    <span className="font-bold text-lg">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full p-3 text-left rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Add New Product</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

// Edit Product Modal Component
function EditProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [imageUrl, setImageUrl] = useState(product.imageUrl || '');
  
  const updateProductMutation = useUpdateProduct();
  const uploadImageMutation = useUploadImage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateProductMutation.mutateAsync({
        id: product.id,
        data: {
          name: name !== product.name ? name : undefined,
          description: description !== product.description ? description : undefined,
          imageUrl: imageUrl !== product.imageUrl ? imageUrl : undefined,
        },
      });
      toast.success('Product updated successfully!');
      onClose();
    } catch {
      toast.error('Failed to update product. Please try again.');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const result = await uploadImageMutation.mutateAsync(e.target.files[0]);
      setImageUrl(result.url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-2xl border border-border/50 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {updateProductMutation.isError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-sm">
              {updateProductMutation.error?.message || 'Failed to update product'}
            </div>
          )}

          {/* Current Image */}
          {imageUrl && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-primary/10">
              <Image src={imageUrl} alt={name} fill className="object-cover" />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Change Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-primary/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateProductMutation.isPending}
              className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updateProductMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
