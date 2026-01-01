'use client';

import ProductCarousel from '../components/ProductCarousel';
import { useProducts } from '@/lib/hooks';

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProducts();

  // Transform products for carousel format
  const carouselProducts = products?.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    imageSrc: product.imageUrl || '/products/placeholder.png',
  })) || [];

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

      {/* Featured Product Carousel */}
      <section className="py-8 sm:py-12 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="text-muted max-w-lg mx-auto">
              Explore our bestselling dermatology solutions trusted by thousands
            </p>
          </div>
          
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
          {!isLoading && !error && carouselProducts.length === 0 && (
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

          {/* Products Carousel */}
          {!isLoading && !error && carouselProducts.length > 0 && (
            <ProductCarousel products={carouselProducts} />
          )}
        </div>
      </section>
    </div>
  );
}
