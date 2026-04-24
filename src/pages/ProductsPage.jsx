import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, Search, X, ChevronDown, Grid3x3, List } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ui/ProductCard';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [view, setView] = useState('grid');

  const catFilter = searchParams.get('cat');
  const searchFilter = searchParams.get('search') || '';
  const filterParam = searchParams.get('filter');

  const filtered = useMemo(() => {
    let res = [...products];

    if (catFilter) res = res.filter(p => p.category === catFilter);
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filterParam === 'new') res = res.filter(p => p.isNew);
    if (filterParam === 'popular') res = res.filter(p => p.isFeatured);
    res = res.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'price-asc': return res.sort((a, b) => a.price - b.price);
      case 'price-desc': return res.sort((a, b) => b.price - a.price);
      case 'rating': return res.sort((a, b) => b.rating - a.rating);
      case 'newest': return res.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return res.sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [catFilter, searchFilter, filterParam, sort, priceRange]);

  const activeCat = categories.find(c => c.id === catFilter);

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, 100]);
  };

  const Sidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-widest text-gray-400">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSearchParams({})}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${!catFilter ? 'bg-brand-50 text-brand-700 font-medium' : 'text-mid hover:bg-gray-50'}`}
          >
            <span>All Products</span>
            <span className="text-xs text-gray-400">{products.length}</span>
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ cat: cat.id })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${catFilter === cat.id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-mid hover:bg-gray-50'}`}
            >
              <span>{cat.icon}</span>
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-gray-400">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-widest text-gray-400">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-mid">
            <span>£0</span>
            <span className="font-medium text-brand-600">Up to £{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Finishes filter */}
      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-widest text-gray-400">Special Finishes</h3>
        <div className="space-y-2">
          {['Foiling', 'Spot UV', 'Soft Touch', 'Embossing', 'Lamination'].map(f => (
            <label key={f} className="flex items-center gap-2 text-sm text-mid cursor-pointer hover:text-dark">
              <input type="checkbox" className="rounded accent-brand-500" />
              {f}
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span>/</span>
        <span className="text-dark">{activeCat ? activeCat.name : 'All Products'}</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-2">
          {searchFilter ? `Results for "${searchFilter}"` : activeCat ? activeCat.name : 'All Products'}
        </h1>
        <p className="text-mid">{filtered.length} products found</p>
      </div>

      {/* Active Filters */}
      {(catFilter || searchFilter || filterParam) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm text-gray-400">Active filters:</span>
          {catFilter && (
            <button
              onClick={() => setSearchParams({})}
              className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-3 py-1.5 rounded-full hover:bg-brand-100"
            >
              {activeCat?.name} <X size={12} />
            </button>
          )}
          {searchFilter && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 bg-brand-50 text-brand-700 text-xs px-3 py-1.5 rounded-full hover:bg-brand-100"
            >
              "{searchFilter}" <X size={12} />
            </button>
          )}
          <button onClick={clearFilters} className="text-xs text-red-500 hover:text-red-700 ml-2">
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 text-sm hover:bg-gray-50"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="appearance-none border border-gray-200 rounded-xl px-4 py-2 text-sm pr-8 bg-white focus:outline-none focus:border-brand-400 cursor-pointer"
                >
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
              <div className="hidden sm:flex gap-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg ${view === 'grid' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid3x3 size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg ${view === 'list' ? 'bg-brand-50 text-brand-600' : 'text-gray-400 hover:bg-gray-50'}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="font-display text-xl text-gray-400 mb-2">No products found</p>
              <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="bg-brand-500 text-white px-6 py-2.5 rounded-full text-sm font-medium">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={`grid gap-5 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {filtered.map(product => (
                view === 'list' ? (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all group"
                  >
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">{product.categoryName}</p>
                      <h3 className="font-display font-semibold group-hover:text-brand-600 transition-colors">{product.name}</h3>
                      <p className="text-xs text-mid mt-1 line-clamp-2">{product.description}</p>
                      <p className="font-semibold mt-2">From £{product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ) : (
                  <ProductCard key={product.id} product={product} />
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilters && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setMobileFilters(false)} />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-bold">Filters</h3>
              <button onClick={() => setMobileFilters(false)}><X size={20} /></button>
            </div>
            <Sidebar />
            <button
              onClick={() => setMobileFilters(false)}
              className="w-full mt-6 bg-brand-500 text-white py-3.5 rounded-xl font-semibold"
            >
              Show {filtered.length} Results
            </button>
          </div>
        </>
      )}
    </div>
  );
}
