import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-mono text-8xl font-bold text-gray-100 mb-4">404</p>
        <h1 className="font-display text-3xl font-bold mb-3">Page not found</h1>
        <p className="text-mid mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="bg-brand-500 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2">
            Back to Home <ArrowRight size={16} />
          </Link>
          <Link to="/products" className="border border-gray-200 text-mid px-8 py-3.5 rounded-full font-semibold hover:border-gray-300 transition-colors">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
