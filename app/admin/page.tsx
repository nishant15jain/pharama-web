'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AdminPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Mock existing products data
  const existingProducts = [
    { id: 1, name: "DermaGlow Serum", image: "/products/IMG_5742 Medium.jpeg", status: "active" },
    { id: 2, name: "HairVital Pro", image: "/products/IMG_5746 Medium.jpeg", status: "active" },
    { id: 3, name: "AcneClear Solution", image: "/products/IMG_5752 Medium.jpeg", status: "active" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // In a real app, this would handle file upload
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
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
              <p className="text-muted">Manage products, uploads, and content</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                System Online
              </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload New Product
                </h2>
                <p className="text-muted text-sm mt-1">Add new product images to the catalog</p>
              </div>
              
              <div className="p-6">
                {/* Drag & Drop Zone */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50 hover:bg-primary/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="font-medium mb-1">
                    Drop images here or <span className="text-primary">browse</span>
                  </p>
                  <p className="text-sm text-muted">Supports JPG, PNG, WEBP up to 10MB</p>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Uploaded Files
                    </h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium">{file}</span>
                          </div>
                          <button
                            onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                            className="p-1 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Form */}
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                      type="text"
                      placeholder="Enter product name..."
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Enter product description..."
                      className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>Select category</option>
                        <option>Skin Care</option>
                        <option>Hair Care</option>
                        <option>Acne Treatment</option>
                        <option>Anti-Aging</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Status</label>
                      <select className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Archived</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full btn-primary py-3 mt-2">
                    Add Product
                  </button>
                </div>
              </div>
            </div>

            {/* Existing Products */}
            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Existing Products
                </h2>
                <p className="text-muted text-sm mt-1">Manage your current product catalog</p>
              </div>
              
              <div className="divide-y divide-border/50">
                {existingProducts.map((product) => (
                  <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-primary/5 transition-colors">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-primary/10 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500/10 text-green-600 capitalize">
                          {product.status}
                        </span>
                        <span className="text-muted text-xs">ID: {product.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors" title="Edit">
                        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card rounded-2xl border border-border/50 p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Total Products", value: "3", icon: "📦", color: "primary" },
                  { label: "Active Products", value: "3", icon: "✅", color: "green" },
                  { label: "Pending Review", value: "0", icon: "⏳", color: "yellow" },
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

          </div>
        </div>
      </div>
    </div>
  );
}

