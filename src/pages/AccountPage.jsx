import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, CreditCard, Settings, LogOut, ChevronRight, Star, Truck } from 'lucide-react';

const mockOrders = [
  { id: 'PS28461', date: '12 Apr 2026', status: 'Delivered', items: 'Premium Business Cards × 250', total: '£24.99', image: 'https://images.unsplash.com/photo-1572502742782-c5c3dcf54e2a?w=100&q=80' },
  { id: 'PS27330', date: '28 Mar 2026', status: 'Processing', items: 'A5 Flyers × 500', total: '£18.99', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&q=80' },
  { id: 'PS26102', date: '14 Mar 2026', status: 'Delivered', items: 'A2 Poster × 10', total: '£12.99', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&q=80' },
];

const statusColors = {
  Delivered: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Dispatch: 'bg-blue-100 text-blue-700',
};

const navItems = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'details', label: 'Account Details', icon: User },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={28} className="text-brand-600" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Sign in</h1>
          <p className="text-mid text-sm">Access your orders, wishlist, and account details</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email Address</label>
            <input
              type="email"
              value={loginForm.email}
              onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
            />
          </div>
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 text-mid cursor-pointer">
              <input type="checkbox" className="rounded accent-brand-500" /> Remember me
            </label>
            <Link to="/forgot-password" className="text-brand-600 hover:underline">Forgot password?</Link>
          </div>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-semibold transition-colors"
          >
            Sign In
          </button>
          <p className="text-center text-sm text-mid">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 hover:underline font-medium">Create one</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-display text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center font-display font-bold text-brand-700 text-lg">
                JD
              </div>
              <div>
                <p className="font-semibold">Jane Doe</p>
                <p className="text-xs text-gray-400">jane@example.com</p>
              </div>
            </div>
            <nav className="space-y-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${activeTab === id ? 'bg-brand-50 text-brand-700 font-medium' : 'text-mid hover:bg-gray-50'}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors mt-2"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </nav>
          </div>

          {/* Rewards Card */}
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold text-sm">PrintShop Rewards</span>
            </div>
            <p className="text-3xl font-display font-bold mb-1">1,240</p>
            <p className="text-white/70 text-xs mb-3">points available</p>
            <Link to="/rewards" className="text-white/90 text-xs underline hover:text-white">
              View rewards →
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="font-display text-xl font-bold mb-5">My Orders</h2>
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src={order.image} alt="" className="w-14 h-14 object-cover rounded-xl" />
                      <div className="flex-1">
                        <p className="text-sm">{order.items}</p>
                        <p className="font-semibold mt-1">{order.total}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                      <button className="text-sm text-brand-600 hover:underline">Track Order</button>
                      <span className="text-gray-200">|</span>
                      <button className="text-sm text-brand-600 hover:underline">Reorder</button>
                      <span className="text-gray-200">|</span>
                      <button className="text-sm text-brand-600 hover:underline">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div>
              <h2 className="font-display text-xl font-bold mb-5">Account Details</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', value: 'Jane' },
                    { label: 'Last Name', value: 'Doe' },
                    { label: 'Email', value: 'jane@example.com' },
                    { label: 'Phone', value: '+44 7700 900000' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-xs font-medium text-gray-400 mb-1">{f.label}</label>
                      <input
                        type="text"
                        defaultValue={f.value}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
                      />
                    </div>
                  ))}
                </div>
                <button className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 className="font-display text-xl font-bold mb-5">Wishlist</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <Heart size={40} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400">Your wishlist is empty</p>
                <Link to="/products" className="text-brand-600 text-sm hover:underline mt-2 block">Browse products →</Link>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div>
              <h2 className="font-display text-xl font-bold mb-5">Payment Methods</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <CreditCard size={40} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 mb-4">No saved payment methods</p>
                <button className="bg-brand-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium">Add Card</button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="font-display text-xl font-bold mb-5">Settings</h2>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                {[
                  { label: 'Order confirmation emails', desc: 'Receive emails when an order is placed' },
                  { label: 'Dispatch notifications', desc: 'Get notified when your order ships' },
                  { label: 'Marketing emails', desc: 'Special offers and new product announcements' },
                  { label: 'SMS notifications', desc: 'Order updates via text message' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.desc}</p>
                    </div>
                    <label className="relative cursor-pointer">
                      <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                      <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-brand-500 transition-colors" />
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
