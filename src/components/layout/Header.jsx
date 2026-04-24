import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Phone, Menu, X, ChevronDown, Star, Truck } from 'lucide-react';
import { useCartStore } from '../../context/store';
import { categories } from '../../data/products';

const megaMenuData = {
  Products: {
    cols: [
      {
        title: "Popular",
        links: [
          { label: "Business Cards", to: "/products?cat=business-cards" },
          { label: "Flyers & Leaflets", to: "/products?cat=flyers" },
          { label: "Posters", to: "/products?cat=posters" },
          { label: "Stickers & Labels", to: "/products?cat=stickers" },
          { label: "Greetings Cards", to: "/products?cat=cards" },
        ]
      },
      {
        title: "Stationery",
        links: [
          { label: "Letterheads", to: "/products?cat=stationery" },
          { label: "Compliment Slips", to: "/products?cat=stationery" },
          { label: "Notebooks", to: "/products?cat=notebooks" },
          { label: "Envelopes", to: "/products?cat=stationery" },
          { label: "NCR Pads", to: "/products?cat=stationery" },
        ]
      },
      {
        title: "Special",
        links: [
          { label: "Wedding Stationery", to: "/products?cat=wedding" },
          { label: "Packaging", to: "/products?cat=packaging" },
          { label: "Banners & Signage", to: "/products?cat=banners" },
          { label: "Calendars", to: "/products?cat=calendars" },
          { label: "Merchandise", to: "/products?cat=merchandise" },
        ]
      },
      {
        title: "Finishes",
        links: [
          { label: "Foiling", to: "/special-finishes" },
          { label: "Spot UV", to: "/special-finishes" },
          { label: "Embossing", to: "/special-finishes" },
          { label: "Soft Touch", to: "/special-finishes" },
          { label: "All Finishes", to: "/special-finishes" },
        ]
      },
    ]
  },
  "Learn More": {
    cols: [
      {
        title: "Resources",
        links: [
          { label: "Delivery Info", to: "/delivery" },
          { label: "Paper Guide", to: "/paper-guide" },
          { label: "Design Templates", to: "/templates" },
          { label: "File Setup", to: "/file-setup" },
          { label: "Blog", to: "/blog" },
        ]
      },
      {
        title: "Services",
        links: [
          { label: "Bespoke Service", to: "/bespoke" },
          { label: "Rewards Programme", to: "/rewards" },
          { label: "Affiliate Programme", to: "/affiliate" },
          { label: "Sample Packs", to: "/samples" },
          { label: "Printed Promise", to: "/promise" },
        ]
      }
    ]
  },
  "Help": {
    cols: [
      {
        title: "Support",
        links: [
          { label: "FAQs", to: "/faq" },
          { label: "Contact Us", to: "/contact" },
          { label: "Track Order", to: "/track" },
          { label: "Returns", to: "/returns" },
        ]
      },
      {
        title: "Discounts",
        links: [
          { label: "Charity Discount", to: "/charity" },
          { label: "Student Discount", to: "/student" },
          { label: "Education Discount", to: "/education" },
          { label: "Trade Accounts", to: "/trade" },
        ]
      }
    ]
  }
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { count, openCart, isOpen } = useCartStore();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleMenuEnter = (menu) => {
    clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-dark text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Truck size={13} /><strong>Free delivery</strong> on orders over £50</span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5"><Star size={13} className="text-brand-400" fill="currentColor" /><strong>4.9/5</strong> from 50,000+ reviews</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/samples" className="hover:text-brand-400 transition-colors">Free Samples</Link>
            <Link to="/rewards" className="hover:text-brand-400 transition-colors">Rewards</Link>
            <a href="tel:08001234567" className="flex items-center gap-1.5 hover:text-brand-400 transition-colors">
              <Phone size={13} /> 0800 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-brand-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">P</span>
              </div>
              <span className="font-display text-xl font-bold text-dark">PrintShop</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {Object.keys(megaMenuData).map((menu) => (
                <div
                  key={menu}
                  className="relative"
                  onMouseEnter={() => handleMenuEnter(menu)}
                  onMouseLeave={handleMenuLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeMenu === menu ? 'text-brand-600 bg-brand-50' : 'text-mid hover:text-dark hover:bg-gray-50'}`}
                  >
                    {menu}
                    <ChevronDown size={14} className={`transition-transform ${activeMenu === menu ? 'rotate-180' : ''}`} />
                  </button>

                  {activeMenu === menu && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-50"
                      style={{ minWidth: megaMenuData[menu].cols.length * 180 + 'px' }}
                      onMouseEnter={() => handleMenuEnter(menu)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${megaMenuData[menu].cols.length}, minmax(0, 1fr))` }}>
                        {megaMenuData[menu].cols.map((col) => (
                          <div key={col.title}>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{col.title}</p>
                            <ul className="space-y-2">
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    to={link.to}
                                    className="text-sm text-mid hover:text-brand-600 hover:translate-x-0.5 transition-all inline-block"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Link to="/special-offers" className="px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-md transition-colors">
                Special Offers
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-soft border border-gray-200 rounded-full focus:outline-none focus:border-brand-400 focus:bg-white transition-all"
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>
              <Link to="/account" className="hidden md:flex items-center gap-1.5 p-2 text-sm text-mid hover:text-dark hover:bg-gray-50 rounded-md transition-colors">
                <User size={18} />
                <span className="hidden lg:block text-sm">Account</span>
              </Link>
              <Link to="/wishlist" className="p-2 text-mid hover:text-dark hover:bg-gray-50 rounded-md transition-colors">
                <Heart size={18} />
              </Link>
              <button
                onClick={openCart}
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-full text-sm font-medium transition-colors relative"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:block">Basket</span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-dark text-white text-xs rounded-full flex items-center justify-center font-mono">
                    {count}
                  </span>
                )}
              </button>
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="md:hidden py-2 border-t border-gray-100">
              <form onSubmit={handleSearch} className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-soft border border-gray-200 rounded-full focus:outline-none focus:border-brand-400"
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?cat=${cat.id}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft transition-colors text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="ml-auto text-gray-400 text-xs">{cat.count}</span>
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3 space-y-1">
                <Link to="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft text-sm" onClick={() => setMobileOpen(false)}>
                  <User size={16} /> My Account
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft text-sm" onClick={() => setMobileOpen(false)}>
                  <Heart size={16} /> Wishlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
