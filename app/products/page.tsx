'use client';

import Image from 'next/image';
import { useProducts } from '@/lib/hooks';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pattern-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-fade-in">
            Our Products
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Premium <span className="gradient-text">Dermatology</span> Products
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-fade-in-up delay-100">
            Discover our range of high-quality dermatology products, each designed 
            to support your skin and hair health with the utmost care and precision.
          </p>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <svg className="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-500 font-medium">Failed to load products</p>
              <p className="text-muted text-sm mt-1">{error.message}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && products?.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="font-medium text-lg">No products available yet</p>
              <p className="text-muted text-sm mt-1">Check back soon for our premium dermatology products</p>
            </div>
          )}

          {/* Products Grid - Single column on mobile, 2 columns on tablet, 3 on desktop */}
          {!isLoading && !error && products && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <Image
                      src={product.imageUrl || '/products/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Subtle gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Premium badge */}
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary shadow-lg">
                      Premium
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                      {product.description || 'High-quality dermatology product for skin and hair care.'}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                        Dermatologist Tested
                      </span>
                      <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-600 border border-cyan-500/20">
                        Clinically Proven
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
