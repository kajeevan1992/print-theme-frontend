import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqData = {
  'Ordering': [
    { q: 'How do I place an order?', a: 'Simply browse our products, select your options (size, quantity, paper, finish), upload your artwork, and add to basket. Checkout takes just a few minutes.' },
    { q: 'Can I order a proof before printing?', a: 'Yes! A digital PDF proof is available free on every order. Physical printed proofs can also be arranged for an additional fee.' },
    { q: 'What quantities can I order?', a: 'Quantities vary by product, starting from as low as 1 for posters, or 25 for business cards. See each product page for available quantities.' },
    { q: 'Can I reorder a previous design?', a: 'Yes, simply log into your account, find your previous order, and click "Reorder". Your saved artwork will be used automatically.' },
  ],
  'Artwork & Files': [
    { q: 'What file format should I use?', a: 'We recommend PDF/X-1a or PDF/X-4. We also accept AI, EPS, and high-resolution JPEG or PNG (minimum 300 DPI).' },
    { q: 'What is bleed and why do I need it?', a: 'Bleed is the extra area beyond the trim line of your design, typically 3mm. It prevents white edges if the cut is slightly off. Always include bleed in your file.' },
    { q: 'Should I use CMYK or RGB?', a: 'Always use CMYK for print files. RGB is for screen use and can produce unexpected colour shifts when printed. We will flag any RGB files before printing.' },
    { q: 'Do you offer design services?', a: 'Yes, our bespoke design service is available for customers who need help creating their artwork. Contact us to discuss your requirements.' },
  ],
  'Delivery': [
    { q: 'How long does delivery take?', a: 'Standard delivery is 5–7 working days. Express is 3–4 days. Next day delivery is available on most products if ordered before 12pm.' },
    { q: 'How much does delivery cost?', a: 'Standard delivery starts from £3.99. Express from £5.99. Next day from £9.99. Free delivery on all orders over £50.' },
    { q: 'Do you deliver internationally?', a: 'Yes, we deliver to most European countries. International delivery costs vary by destination and are calculated at checkout.' },
    { q: 'Can I track my order?', a: 'Yes, you\'ll receive a tracking link by email as soon as your order is dispatched.' },
  ],
  'Quality & Returns': [
    { q: 'What is the Printed Promise?', a: 'If your order contains a manufacturing defect, colour inaccuracy (when files are set up correctly), or damage in transit, we will reprint or refund in full.' },
    { q: 'What if I\'m not happy with my order?', a: 'Contact us within 14 days of receiving your order. If the issue is on our end, we\'ll reprint or refund. Please include photos of the issue.' },
    { q: 'What paper stocks do you use?', a: 'We use FSC-certified papers from sustainable sources. Our range includes silk, gloss, uncoated, recycled, and specialty stocks.' },
    { q: 'Are you environmentally friendly?', a: 'Yes! We are carbon neutral, use renewable energy in our print facility, and offer a range of recycled and eco papers.' },
  ],
  'Account & Payments': [
    { q: 'Do I need an account to order?', a: 'No, you can checkout as a guest. However, an account lets you track orders, save designs, and earn rewards points.' },
    { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, and bank transfer for trade accounts.' },
    { q: 'Is my payment information secure?', a: 'Yes, all payments are processed via Stripe with 256-bit SSL encryption. We never store your card details.' },
    { q: 'Do you offer trade/business accounts?', a: 'Yes! Trade accounts offer discounted pricing, 30-day payment terms, and a dedicated account manager. Apply online or contact us.' },
  ],
};

export default function FAQPage() {
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Ordering');

  const filtered = search
    ? Object.entries(faqData).flatMap(([cat, items]) =>
        items.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
          .map(i => ({ ...i, cat }))
      )
    : faqData[activeCategory];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold mb-3">Frequently Asked Questions</h1>
        <p className="text-mid mb-6">Can't find what you're looking for? <Link to="/contact" className="text-brand-600 hover:underline">Contact us</Link></p>
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-brand-400 text-sm"
          />
        </div>
      </div>

      {!search && (
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {Object.keys(faqData).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-dark text-white' : 'bg-white border border-gray-200 text-mid hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        {(Array.isArray(filtered) ? filtered : []).map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <button
              onClick={() => setOpenItem(openItem === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium pr-4">{item.q}</span>
              {openItem === i ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
            </button>
            {openItem === i && (
              <div className="px-6 pb-5 border-t border-gray-50">
                <p className="text-mid text-sm leading-relaxed pt-4">{item.a}</p>
              </div>
            )}
          </div>
        ))}
        {Array.isArray(filtered) && filtered.length === 0 && (
          <div className="text-center py-12 text-mid">
            <p className="mb-2">No results for "{search}"</p>
            <Link to="/contact" className="text-brand-600 hover:underline text-sm">Contact us instead →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
