import ProductCard from '../components/ProductCard';

// Product data - in a real app, this would come from an API/database
const products = [
  {
    id: 1,
    name: "DermaGlow Serum",
    description: "Advanced skin brightening serum with vitamin C and niacinamide. Reduces dark spots and evens skin tone for a radiant complexion.",
    imageSrc: "/products/IMG_5742 Medium.jpeg",
  },
  {
    id: 2,
    name: "HairVital Pro",
    description: "Clinically proven hair growth formula with biotin and peptides. Strengthens hair follicles and promotes healthy hair growth.",
    imageSrc: "/products/IMG_5746 Medium.jpeg",
  },
  {
    id: 3,
    name: "AcneClear Solution",
    description: "Powerful acne treatment with salicylic acid and tea tree extract. Clears blemishes and prevents future breakouts.",
    imageSrc: "/products/IMG_5752 Medium.jpeg",
  },
];

export default function ProductsPage() {
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

      {/* Filter Bar */}
      <section className="sticky top-16 sm:top-20 z-30 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-muted text-sm">Showing</span>
              <span className="font-semibold text-primary">{products.length}</span>
              <span className="text-muted text-sm">products</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <select className="px-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>All Categories</option>
                <option>Skin Care</option>
                <option>Hair Care</option>
                <option>Acne Treatment</option>
                <option>Anti-Aging</option>
              </select>
              
              {/* Sort */}
              <select className="px-4 py-2 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Sort by: Featured</option>
                <option>Name: A-Z</option>
                <option>Name: Z-A</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                name={product.name}
                description={product.description}
                imageSrc={product.imageSrc}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Empty State - shown when no products match filter */}
      {products.length === 0 && (
        <section className="py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted">Try adjusting your filters or check back later for new products.</p>
          </div>
        </section>
      )}

      {/* Info Banner */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-12">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ),
                title: "Quality Guaranteed",
                description: "All products meet strict quality standards",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Fast Shipping",
                description: "Quick delivery to your doorstep",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "24/7 Support",
                description: "Expert help whenever you need it",
              },
            ].map((item, index) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

