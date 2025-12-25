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
      className={`group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 card-hover animate-fade-in-up ${delayClass}`}
      style={{ opacity: 0, animationFillMode: 'forwards' }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick action button */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 btn-primary text-sm whitespace-nowrap">
          View Details
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-muted text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            Dermatologist Tested
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary">
            Clinically Proven
          </span>
        </div>
      </div>
    </div>
  );
}

