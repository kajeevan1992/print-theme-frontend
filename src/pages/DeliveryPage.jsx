import React from 'react';
import { Truck, Zap, Clock, Package, Globe, Check } from 'lucide-react';

const options = [
  { name: 'Standard', days: '5–7 working days', price: 'From £3.99', icon: Package, desc: 'Reliable standard delivery via Royal Mail or DPD tracked service.' },
  { name: 'Express', days: '3–4 working days', price: 'From £5.99', icon: Clock, desc: 'Faster turnaround when you need your prints sooner.' },
  { name: 'Next Day', days: 'Next working day', price: 'From £9.99', icon: Zap, desc: 'Order before 12pm for next working day delivery (subject to product availability).' },
  { name: 'Free Delivery', days: '5–7 working days', price: 'FREE on orders over £50', icon: Truck, desc: 'Automatically applied at checkout when your order exceeds £50.' },
  { name: 'International', days: '7–14 working days', price: 'From £12.99', icon: Globe, desc: 'We deliver to most European countries. Rates vary by destination.' },
];

export default function DeliveryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-3">Delivery Information</h1>
        <p className="text-mid text-lg">Fast, reliable delivery on all orders. Track your parcel every step of the way.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {options.map(({ name, days, price, icon: Icon, desc }) => (
          <div key={name} className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">
              <Icon size={18} className="text-brand-600" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">{name}</h3>
            <p className="text-brand-600 font-semibold text-sm mb-1">{days}</p>
            <p className="text-mid text-sm mb-3">{price}</p>
            <p className="text-sm text-mid leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-soft rounded-2xl p-8">
        <h2 className="font-display text-2xl font-bold mb-5">Good to know</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'All orders are tracked — you\'ll receive a tracking number by email once dispatched.',
            'Delivery times are counted from when your artwork is approved, not when you place your order.',
            'Next day delivery must be ordered before 12pm on a working day.',
            'We ship in protective packaging to ensure your prints arrive in perfect condition.',
            'Signature may be required for larger orders.',
            'If you\'re not home, your parcel will be left in a safe place or returned to the depot.',
          ].map((item, i) => (
            <div key={i} className="flex gap-3 text-sm text-mid">
              <Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
