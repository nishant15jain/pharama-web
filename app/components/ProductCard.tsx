import Image from 'next/image';

interface ProductCardProps {
  name: string;
  description: string;
  imageSrc: string;
  index: number;
}

export default function ProductCard({ name, description, imageSrc, index }: ProductCardProps) {
  const delayClass = `delay-${(index % 5) * 100 + 100}`;

  return (
    <div
      className={`group bg-card rounded-3xl overflow-hidden shadow-lg border border-border/30 card-hover animate-fade-in-up ${delayClass}`}
      style={{ opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Image Container - taller aspect ratio to show full product */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-contain p-4 transition-all duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary shadow-lg">
          Premium
        </div>
        
        {/* Quick action button */}
        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out btn-primary text-sm whitespace-nowrap shadow-xl">
          View Details
        </button>
      </div>

      {/* Content */}
      <div className="p-6 bg-white">
        <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            Dermatologist Tested
          </span>
          <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary border border-secondary/20">
            Clinically Proven
          </span>
        </div>
      </div>
    </div>
  );
}
