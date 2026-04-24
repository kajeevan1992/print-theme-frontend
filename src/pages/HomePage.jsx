import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, ChevronLeft, ChevronRight, Sparkles, Zap, Shield } from 'lucide-react';
import { products, categories, testimonials, specialFinishes } from '../../data/products';
import ProductCard from '../ui/ProductCard';

const heroSlides = [
  {
    headline: "Print that makes\nan impression",
    subtext: "Premium quality print products delivered fast. Business cards, flyers, posters and more.",
    cta: "Shop Now",
    ctaLink: "/products",
    accent: "from £9.99",
    image: "https://images.unsplash.com/photo-1572502742782-c5c3dcf54e2a?w=900&q=80",
    bg: "from-stone-900 to-stone-700",
  },
  {
    headline: "Wedding stationery\nthat wows",
    subtext: "Beautiful invitations, place cards and wedding suites. Premium finishes available.",
    cta: "See Collection",
    ctaLink: "/products?cat=wedding",
    accent: "from £29.99",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80",
    bg: "from-rose-900 to-stone-800",
  },
  {
    headline: "Special finishes\nthat stand out",
    subtext: "Foiling, Spot UV, embossing and more. Make your prints truly unforgettable.",
    cta: "Explore Finishes",
    ctaLink: "/special-finishes",
    accent: "Available now",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80",
    bg: "from-amber-900 to-stone-800",
  },
];

function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[current];

  return (
    <div className="relative overflow-hidden bg-dark rounded-2xl mx-4 md:mx-0" style={{ minHeight: '480px' }}>
      {/* Background image */}
      <img
        src={slide.image}
        alt=""
        key={current}
        className="absolute inset-0 w-full h-full object-cover opacity-30 transition-opacity duration-700"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-80`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 py-16 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-6">
          <Sparkles size={14} className="text-brand-400" />
          {slide.accent}
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 whitespace-pre-line leading-tight">
          {slide.headline}
        </h1>
        <p className="text-white/70 text-lg mb-8 max-w-md">
          {slide.subtext}
        </p>
        <div className="flex items-center gap-4">
          <Link
            to={slide.ctaLink}
            className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-all hover:gap-3"
          >
            {slide.cta} <ArrowRight size={16} />
          </Link>
          <Link to="/samples" className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors">
            Free samples →
          </Link>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-8 md:left-16 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-brand-400 w-8' : 'bg-white/30 w-1.5'}`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => setCurrent(c => (c + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function TrustBar() {
  const items = [
    { icon: <Zap size={16} className="text-brand-500" />, text: "Next day dispatch available" },
    { icon: <Star size={16} className="text-amber-400" fill="currentColor" />, text: "4.9/5 from 50,000+ reviews" },
    { icon: <Shield size={16} className="text-emerald-500" />, text: "Printed Promise guarantee" },
    { icon: <CheckCircle size={16} className="text-blue-500" />, text: "Free samples available" },
  ];
  return (
    <div className="bg-white border-y border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-mid">
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryGrid() {
  const featured = categories.slice(0, 8);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-1">Browse by category</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">What are you looking for?</h2>
          </div>
          <Link to="/products" className="hidden md:flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {featured.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?cat=${cat.id}`}
              className="group flex flex-col items-center justify-center gap-3 p-6 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
              <div className="text-center">
                <p className="font-semibold text-sm text-dark group-hover:text-brand-600 transition-colors">{cat.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{cat.count} products</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 md:hidden">
          <Link to="/products" className="text-brand-600 text-sm font-medium">View all categories →</Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const featured = products.filter(p => p.isFeatured);
  return (
    <section className="py-16 bg-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-1">Top picks</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">Most popular products</h2>
          </div>
          <Link to="/products?filter=popular" className="hidden md:flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialFinishesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-1">Premium options</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">Special finishes</h2>
          </div>
          <Link to="/special-finishes" className="hidden md:flex items-center gap-1 text-sm text-brand-600 font-medium">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Foiling', desc: 'Gold, silver & coloured foil', emoji: '✨', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
            { name: 'Spot UV', desc: 'High-gloss spot varnish', emoji: '💧', img: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=400&q=80' },
            { name: 'Embossing', desc: 'Raised tactile elements', emoji: '🔲', img: 'https://images.unsplash.com/photo-1579187707643-35646d22b596?w=400&q=80' },
            { name: 'Soft Touch', desc: 'Velvety matt lamination', emoji: '🤍', img: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=400&q=80' },
          ].map(f => (
            <Link
              key={f.name}
              to="/special-finishes"
              className="group relative overflow-hidden rounded-2xl aspect-square"
            >
              <img src={f.img} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-xl mb-1">{f.emoji}</p>
                <p className="font-display font-bold text-white">{f.name}</p>
                <p className="text-white/70 text-xs">{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewProducts() {
  const newOnes = products.filter(p => p.isNew);
  return (
    <section className="py-16 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-400 text-sm font-semibold uppercase tracking-widest mb-1">Just arrived</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">What's new?</h2>
          </div>
          <Link to="/products?filter=new" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 font-medium">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {newOnes.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group flex gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-xl shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1">
                <span className="inline-block bg-emerald-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mb-2">New</span>
                <p className="font-display font-semibold text-white group-hover:text-brand-300 transition-colors leading-snug">{product.name}</p>
                <p className="text-sm text-white/50 mt-1">From £{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-16 bg-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-1">Customer reviews</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-2">Don't just take our word for it</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-mid">
            <div className="flex">
              {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400" fill="currentColor" />)}
            </div>
            <strong>4.9/5</strong> from over 50,000 reviews
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} size={13} className="text-amber-400" fill="currentColor" />)}
              </div>
              <p className="text-sm text-mid leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3 border-t border-gray-50 pt-4">
                <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold font-display">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseBanner() {
  const promises = [
    { icon: '🎯', title: 'Colour Perfect', desc: 'We guarantee your colours will print exactly as designed.' },
    { icon: '⚡', title: 'Fast Turnaround', desc: 'Next day dispatch on most products, every time.' },
    { icon: '♻️', title: 'Eco Friendly', desc: 'Carbon neutral printing with certified sustainable materials.' },
    { icon: '💰', title: 'Price Match', desc: "Find it cheaper elsewhere? We'll match it, no questions asked." },
  ];
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl border border-gray-100 p-10">
          <div className="text-center mb-10">
            <p className="text-brand-600 text-sm font-semibold uppercase tracking-widest mb-1">Our commitment</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark">The PrintShop Promise</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {promises.map((p, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{p.icon}</div>
                <h3 className="font-display font-bold text-dark mb-2">{p.title}</h3>
                <p className="text-sm text-mid leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                Not sure where to start?
              </h2>
              <p className="text-white/80 text-lg max-w-md">
                Order a free sample pack and feel the quality before you commit to a full order.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/samples"
                className="bg-white text-brand-600 hover:bg-brand-50 px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                Get Free Samples <ArrowRight size={16} />
              </Link>
              <Link
                to="/products"
                className="border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center transition-colors whitespace-nowrap"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto pt-4">
        <HeroBanner />
      </div>
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <SpecialFinishesSection />
      <NewProducts />
      <Testimonials />
      <PromiseBanner />
      <CTASection />
    </div>
  );
}
