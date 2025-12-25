import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Dermatologist Approved",
      description: "All products are clinically tested and approved by leading dermatologists in India.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Innovation Driven",
      description: "Backed by extensive research in dermatology and cutting-edge skincare innovation.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Skin & Hair Care",
      description: "Comprehensive solutions for both skin health and hair care needs.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Patient First",
      description: "Every decision we make puts patient skin health and wellbeing at the forefront.",
    },
  ];

  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "50+", label: "Products" },
    { value: "Pan India", label: "Coverage" },
    { value: "1M+", label: "Patients Helped" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pattern-bg" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Speciality Dermatology Experts
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
                Healthy Skin,{" "}
                <span className="gradient-text">Beautiful You</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-100">
                An innovative driven speciality Dermatology company in India offering high quality 
                products in medical dermatology for skin as well hair care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-200">
                <Link href="/products" className="btn-primary text-base px-8 py-4">
                  Explore Our Products
                </Link>
                <Link href="#about" className="btn-secondary text-base px-8 py-4">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative animate-fade-in delay-300">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative rings */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full border-2 border-primary/30 animate-pulse delay-100" />
                <div className="absolute inset-8 rounded-full border-2 border-primary/40 animate-pulse delay-200" />
                
                {/* Center content */}
                <div className="absolute inset-12 rounded-full gradient-bg flex items-center justify-center shadow-2xl shadow-primary/30">
                  <svg
                    className="w-32 h-32 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-fade-in delay-400">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute bottom-8 left-4 w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-fade-in delay-500">
                  <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 sm:py-32 relative">
        <div className="absolute inset-0 pattern-bg opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Excellence in{" "}
              <span className="gradient-text">Dermatology</span>
            </h2>
            <p className="text-lg text-muted">
              We combine years of experience with cutting-edge dermatological research to deliver 
              skincare and haircare products you can trust.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 bg-card rounded-2xl border border-border/50 card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl gradient-bg p-8 sm:p-12 lg:p-16">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready for Healthier Skin & Hair?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-lg">
                  Discover our comprehensive range of dermatology products designed 
                  to improve your skin health and enhance your natural beauty.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
                >
                  View All Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="hidden lg:flex justify-end">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute inset-4 bg-white/30 rounded-full" />
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-20 h-20 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
