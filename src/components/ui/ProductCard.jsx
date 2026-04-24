import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useWishlistStore, useCartStore } from '../../context/store';

const badgeColors = {
  brand: 'bg-brand-500 text-white',
  red: 'bg-red-500 text-white',
  green: 'bg-emerald-500 text-white',
  blue: 'bg-blue-500 text-white',
};

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const { toggle, isWishlisted } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addItem(product, { Size: product.sizes?.[0], Qty: product.quantities?.[0] });
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brand-200 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-soft">
        <img
          src={hovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[product.badgeColor] || badgeColors.brand}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggle(product); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
            wishlisted ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <button
            onClick={handleQuickAdd}
            className="w-full bg-dark/90 backdrop-blur-sm text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-dark transition-colors"
          >
            <ShoppingCart size={13} /> Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 mb-1">{product.categoryName}</p>
        <h3 className="font-display font-semibold text-sm text-dark mb-2 group-hover:text-brand-600 transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} className={s <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'} fill="currentColor" />
            ))}
          </div>
          <span className="text-xs text-gray-400">{product.rating} ({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-dark">From £{product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
