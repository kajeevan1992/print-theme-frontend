import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../context/store';
import ProductCard from '../components/ui/ProductCard';

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-2">My Wishlist</h1>
      <p className="text-mid mb-8">{items.length} saved item{items.length !== 1 ? 's' : ''}</p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={56} className="mx-auto text-gray-200 mb-4" />
          <p className="font-display text-xl text-gray-400 mb-2">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mb-6">Save products you love by clicking the heart icon</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-brand-500 text-white px-8 py-3.5 rounded-full font-semibold">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
