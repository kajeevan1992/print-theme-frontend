import React, { useState } from 'react';
import { Check, Package, Star, ArrowRight } from 'lucide-react';

const samplePacks = [
  {
    id: 'business',
    name: 'Business Pack',
    description: 'Everything you need to see our business print quality.',
    items: ['Business Cards (5 finishes)', 'Letterhead sample', 'Compliment slip', 'Folder'],
    image: 'https://images.unsplash.com/photo-1572502742782-c5c3dcf54e2a?w=400&q=80',
    popular: false,
  },
  {
    id: 'finishes',
    name: 'Special Finishes Pack',
    description: 'Feel the difference our premium finishes make in person.',
    items: ['Foiled business card', 'Spot UV business card', 'Soft touch lamination', 'Embossed stationery', 'Edge painted card'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    popular: true,
  },
  {
    id: 'wedding',
    name: 'Wedding Pack',
    description: 'Sample our full range of wedding stationery.',
    items: ['Invitations (3 styles)', 'Place cards', 'Menu card', 'Order of service', 'Thank you card'],
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80',
    popular: false,
  },
  {
    id: 'paper',
    name: 'Paper Swatch Book',
    description: 'Feel every paper stock and weight we offer.',
    items: ['All paper weights', 'Coated & uncoated', 'Recycled options', 'Textured stocks'],
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80',
    popular: false,
  },
];

export default function SamplePacksPage() {
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', postcode: '' });

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {!submitted ? (
        <>
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-brand-600" />
            </div>
            <h1 className="font-display text-4xl font-bold mb-3">Free Sample Packs</h1>
            <p className="text-mid text-lg max-w-xl mx-auto">
              Not sure about the quality? Feel it for yourself. We'll send you a free sample pack — completely free, no strings attached.
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              {['Free of charge', 'Next day delivery', 'No account needed'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-mid">
                  <Check size={14} className="text-emerald-500" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {samplePacks.map(pack => (
              <button
                key={pack.id}
                onClick={() => toggle(pack.id)}
                className={`text-left rounded-2xl border-2 overflow-hidden transition-all ${selected.includes(pack.id) ? 'border-brand-500 shadow-lg shadow-brand-100' : 'border-gray-100 hover:border-brand-200'}`}
              >
                <div className="relative aspect-video">
                  <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
                  {pack.popular && (
                    <span className="absolute top-2 left-2 bg-brand-500 text-white text-xs font-semibold px-2 py-1 rounded-full">Most Requested</span>
                  )}
                  {selected.includes(pack.id) && (
                    <div className="absolute top-2 right-2 w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold mb-1">{pack.name}</h3>
                  <p className="text-xs text-mid mb-3">{pack.description}</p>
                  <ul className="space-y-1">
                    {pack.items.map(item => (
                      <li key={item} className="flex items-center gap-1.5 text-xs text-mid">
                        <Check size={11} className="text-brand-500 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="max-w-xl mx-auto bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="font-display text-xl font-bold mb-5">Your Delivery Details</h2>
              <div className="space-y-4">
                {[
                  { label: 'Full Name', name: 'name', placeholder: 'Jane Smith' },
                  { label: 'Email Address', name: 'email', placeholder: 'jane@example.com' },
                  { label: 'Address', name: 'address', placeholder: '123 High Street' },
                  { label: 'City', name: 'city', placeholder: 'London' },
                  { label: 'Postcode', name: 'postcode', placeholder: 'SW1A 1AA' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      value={form[f.name]}
                      onChange={e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  Request Free Samples <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-emerald-500" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-3">Samples on the way!</h2>
          <p className="text-mid max-w-md mx-auto">Your free sample pack{selected.length > 1 ? 's' : ''} will arrive within 1–2 working days. We hope you love the quality as much as we do.</p>
        </div>
      )}
    </div>
  );
}
