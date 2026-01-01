'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  imageSrc: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
    },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative px-12">
      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product, index) => {
            const isActive = index === selectedIndex;
            
            return (
              <div
                key={product.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_40%] pl-4"
              >
                <div 
                  className={`
                    bg-white rounded-2xl overflow-hidden border transition-all duration-500 ease-out cursor-pointer
                    ${isActive 
                      ? 'shadow-2xl shadow-primary/25 border-primary/30 scale-100' 
                      : 'shadow-md border-gray-100 scale-[0.92] opacity-60'
                    }
                  `}
                  onClick={() => scrollTo(index)}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-white">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      fill
                      className={`
                        object-contain p-4 transition-transform duration-500
                        ${isActive ? 'scale-100' : 'scale-90'}
                      `}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 text-center">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Next Button */}
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors z-10"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            type="button"
            className={`
              rounded-full transition-all duration-300
              ${index === selectedIndex 
                ? 'w-8 h-2 bg-primary' 
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}
