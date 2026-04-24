import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const finishes = [
  {
    id: 'foiling',
    name: 'Foiling',
    emoji: '✨',
    tagline: 'Luxurious metallic shine',
    description: 'Hot foil stamping adds a dazzling metallic element to your print. Available in gold, silver, rose gold, copper, and a range of holographic options. Perfect for business cards, wedding stationery, and packaging.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    colors: ['Gold', 'Silver', 'Rose Gold', 'Copper', 'Holographic', 'Black'],
    colorSwatches: ['#D4AF37', '#C0C0C0', '#B76E79', '#B87333', '#9B59B6', '#1a1a1a'],
    products: ['Business Cards', 'Wedding Invitations', 'Greetings Cards', 'Packaging'],
  },
  {
    id: 'spot-uv',
    name: 'Spot UV',
    emoji: '💧',
    tagline: 'Gloss that makes elements pop',
    description: 'Spot UV applies a high-gloss, raised varnish to specific areas of your design. The contrast between matt and gloss creates a striking visual and tactile effect. Ideal for logos, patterns, and design accents.',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80',
    colors: ['Gloss Clear'],
    colorSwatches: ['#ffffff'],
    products: ['Business Cards', 'Flyers', 'Brochures', 'Postcards'],
  },
  {
    id: 'embossing',
    name: 'Embossing & Debossing',
    emoji: '🔲',
    tagline: 'Tactile depth and dimension',
    description: 'Embossing creates a raised relief on your print, while debossing creates an impression into the surface. Both techniques add a premium, tactile quality that elevates your brand. Often combined with foiling for maximum impact.',
    image: 'https://images.unsplash.com/photo-1579187707643-35646d22b596?w=800&q=80',
    colors: ['Blind Emboss', 'Foil + Emboss'],
    colorSwatches: ['#f0ede8', '#D4AF37'],
    products: ['Business Cards', 'Notebooks', 'Packaging', 'Wedding Stationery'],
  },
  {
    id: 'soft-touch',
    name: 'Soft Touch Lamination',
    emoji: '🤍',
    tagline: 'Velvety, luxurious feel',
    description: 'Soft touch lamination gives your print a silky-smooth, velvet-like texture that is irresistible to touch. It subtly mutes colours for a sophisticated, understated look. Often described as the most premium lamination finish available.',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800&q=80',
    colors: ['Matt Soft Touch'],
    colorSwatches: ['#e8e4df'],
    products: ['Business Cards', 'Brochures', 'Packaging', 'Notebooks'],
  },
  {
    id: 'letterpress',
    name: 'Letterpress',
    emoji: '🖋️',
    tagline: 'Deep impression, timeless craft',
    description: 'Letterpress printing creates a beautiful, deep impression in uncoated paper. This artisanal technique has been used for centuries and is beloved for its tactile, handcrafted quality. Ideal for wedding stationery and premium business cards.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
    colors: ['1 Colour', '2 Colour', 'Full Colour'],
    colorSwatches: ['#1a1a1a', '#ff7c20', '#4a90e2'],
    products: ['Wedding Invitations', 'Business Cards', 'Notecards'],
  },
  {
    id: 'edge-painting',
    name: 'Edge Painting',
    emoji: '🎨',
    tagline: 'Colourful edges, bold detail',
    description: 'Edge painting adds a vibrant splash of colour to the edges of thick business cards or stationery. It\'s a subtle but stunning detail that surprises and delights when your card is held sideways.',
    image: 'https://images.unsplash.com/photo-1606189934846-a527add8a77b?w=800&q=80',
    colors: ['Orange', 'Blue', 'Red', 'Green', 'Gold', 'Any Pantone'],
    colorSwatches: ['#ff7c20', '#4a90e2', '#e74c3c', '#2ecc71', '#D4AF37', '#9b59b6'],
    products: ['Business Cards', 'Stationery'],
  },
];

export default function SpecialFinishesPage() {
  const [activeFinish, setActiveFinish] = useState(finishes[0]);

  return (
    <div>
      {/* Hero */}
      <div className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={20} className="text-brand-400" />
            <span className="text-brand-400 text-sm font-semibold uppercase tracking-widest">Premium Options</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Special Finishes</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Take your print to the next level with our range of premium finishes. From dazzling foiling to tactile soft touch — make your brand truly unforgettable.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight size={14} />
          <span className="text-dark">Special Finishes</span>
        </div>
      </div>

      {/* Finish Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap mb-10">
          {finishes.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFinish(f)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeFinish.id === f.id ? 'bg-dark text-white' : 'bg-white border border-gray-200 text-mid hover:border-gray-300'}`}
            >
              <span>{f.emoji}</span> {f.name}
            </button>
          ))}
        </div>

        {/* Active Finish Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src={activeFinish.image} alt={activeFinish.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-5xl block mb-4">{activeFinish.emoji}</span>
            <h2 className="font-display text-4xl font-bold text-dark mb-2">{activeFinish.name}</h2>
            <p className="text-brand-600 font-medium mb-4">{activeFinish.tagline}</p>
            <p className="text-mid leading-relaxed mb-6">{activeFinish.description}</p>

            {/* Colour options */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Available in:</p>
              <div className="flex gap-3 flex-wrap">
                {activeFinish.colors.map((c, i) => (
                  <div key={c} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full border border-gray-200 shadow-sm"
                      style={{ background: activeFinish.colorSwatches[i] || '#ddd' }}
                    />
                    <span className="text-sm text-mid">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available on */}
            <div className="mb-8">
              <p className="text-sm font-semibold mb-2">Available on:</p>
              <div className="flex flex-wrap gap-2">
                {activeFinish.products.map(p => (
                  <span key={p} className="bg-soft text-sm px-3 py-1.5 rounded-full text-mid">{p}</span>
                ))}
              </div>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              Shop with {activeFinish.name} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* All finishes grid */}
        <div className="border-t border-gray-100 pt-12">
          <h2 className="font-display text-2xl font-bold mb-6">All Special Finishes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {finishes.map(f => (
              <button
                key={f.id}
                onClick={() => setActiveFinish(f)}
                className={`p-4 rounded-2xl text-center border transition-all hover:-translate-y-0.5 ${activeFinish.id === f.id ? 'border-brand-300 bg-brand-50' : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'}`}
              >
                <span className="text-3xl block mb-2">{f.emoji}</span>
                <p className="text-sm font-semibold">{f.name}</p>
                <p className="text-xs text-gray-400 mt-1">{f.tagline}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
