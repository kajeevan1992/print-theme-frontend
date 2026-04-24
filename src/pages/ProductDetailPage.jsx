import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronRight,
  Plus, Minus, Check, Info, Upload, ChevronDown, ChevronUp
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ui/ProductCard';
import { useCartStore, useWishlistStore } from '../context/store';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);

  const { addItem } = useCartStore();
  const { toggle, isWishlisted } = useWishlistStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedPaper, setSelectedPaper] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedTurnaround, setSelectedTurnaround] = useState(0);
  const [openSection, setOpenSection] = useState('description');
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Product not found</h1>
        <Link to="/products" className="text-brand-600 hover:underline">← Back to products</Link>
      </div>
    );
  }

  const images = [product.image, product.hoverImage || product.image, product.image].filter(Boolean);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, {
      Size: product.sizes[selectedSize],
      Quantity: product.quantities[selectedQty],
      Paper: product.papers[selectedPaper],
      Finish: product.finishes[selectedFinish],
      Turnaround: product.turnaround[selectedTurnaround],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const unitPrice = product.price;
  const qty = product.quantities[selectedQty] || 1;
  const totalPrice = unitPrice * (qty / 100);

  const faqs = [
    { q: 'What file format should I upload?', a: 'We accept PDF, AI, EPS, or high-resolution JPEG/PNG files. PDF is preferred. Ensure files are in CMYK colour mode at 300 DPI.' },
    { q: 'Can I see a proof before printing?', a: 'A digital PDF proof is included free with every order. If you need a printed proof, this can be arranged at an additional cost.' },
    { q: 'What is your returns policy?', a: 'If your order contains a manufacturing defect, we will reprint or refund at no cost. Our Printed Promise covers every order.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 flex-wrap">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?cat=${product.category}`} className="hover:text-brand-600">{product.categoryName}</Link>
        <ChevronRight size={14} />
        <span className="text-dark">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-soft">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${selectedImage === i ? 'border-brand-500' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.badge && (
            <span className="inline-block bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              {product.badge}
            </span>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <p className="text-mid leading-relaxed mb-6">{product.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.features.map(f => (
              <span key={f} className="flex items-center gap-1.5 text-xs bg-soft px-3 py-1.5 rounded-full text-mid">
                <Check size={11} className="text-brand-500" /> {f}
              </span>
            ))}
          </div>

          <div className="space-y-5 border-t border-gray-100 pt-6">
            {/* Size */}
            <div>
              <label className="text-sm font-semibold text-dark block mb-2">Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(i)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${selectedSize === i ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-mid'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-sm font-semibold text-dark block mb-2">Quantity</label>
              <div className="flex flex-wrap gap-2">
                {product.quantities.map((q, i) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQty(i)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${selectedQty === i ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-mid'}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Paper */}
            <div>
              <label className="text-sm font-semibold text-dark block mb-2">Paper / Material</label>
              <div className="flex flex-wrap gap-2">
                {product.papers.map((paper, i) => (
                  <button
                    key={paper}
                    onClick={() => setSelectedPaper(i)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${selectedPaper === i ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-mid'}`}
                  >
                    {paper}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div>
              <label className="text-sm font-semibold text-dark block mb-2">Finish</label>
              <div className="flex flex-wrap gap-2">
                {product.finishes.map((finish, i) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(i)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${selectedFinish === i ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-mid'}`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Turnaround */}
            <div>
              <label className="text-sm font-semibold text-dark block mb-2">Turnaround</label>
              <div className="flex flex-wrap gap-2">
                {product.turnaround.map((t, i) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTurnaround(i)}
                    className={`px-4 py-2 rounded-xl text-sm border flex items-center gap-2 transition-all ${selectedTurnaround === i ? 'border-brand-500 bg-brand-50 text-brand-700 font-medium' : 'border-gray-200 hover:border-gray-300 text-mid'}`}
                  >
                    <Truck size={13} /> {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-display text-3xl font-bold text-dark">£{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">£{product.originalPrice.toFixed(2)}</span>
              )}
              <span className="text-sm text-gray-400">+ VAT</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white'
                }`}
              >
                {added ? <><Check size={18} /> Added to basket</> : <><ShoppingCart size={18} /> Add to basket</>}
              </button>
              <button
                onClick={() => toggle(product)}
                className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted(product.id) ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 hover:border-gray-300 text-gray-400 hover:text-red-400'
                }`}
              >
                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Upload Design CTA */}
            <button className="w-full mt-3 border-2 border-dashed border-brand-200 hover:border-brand-400 rounded-xl py-3.5 text-sm font-medium text-brand-600 flex items-center justify-center gap-2 transition-colors">
              <Upload size={16} /> Upload your design
            </button>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center">
                <Truck size={18} className="mx-auto text-brand-500 mb-1" />
                <p className="text-xs text-mid">Fast dispatch</p>
              </div>
              <div className="text-center">
                <Shield size={18} className="mx-auto text-brand-500 mb-1" />
                <p className="text-xs text-mid">Quality promise</p>
              </div>
              <div className="text-center">
                <RotateCcw size={18} className="mx-auto text-brand-500 mb-1" />
                <p className="text-xs text-mid">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordions */}
      <div className="max-w-3xl mx-auto mb-16 space-y-3">
        {[
          { id: 'description', title: 'Product Description', content: (
            <div>
              <p className="text-mid leading-relaxed">{product.description}</p>
              <ul className="mt-4 space-y-2">
                {product.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-mid">
                    <Check size={14} className="text-brand-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          )},
          { id: 'file-setup', title: 'File Setup Guide', content: (
            <div className="text-sm text-mid space-y-3">
              <p>To ensure the best print quality, please follow these guidelines:</p>
              <ul className="space-y-2">
                <li className="flex gap-2"><Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> Set your document to the correct size plus 3mm bleed on each side</li>
                <li className="flex gap-2"><Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> Use CMYK colour mode (not RGB)</li>
                <li className="flex gap-2"><Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> Minimum 300 DPI resolution</li>
                <li className="flex gap-2"><Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> All fonts embedded or converted to outlines</li>
                <li className="flex gap-2"><Check size={14} className="text-brand-500 mt-0.5 shrink-0" /> Save as PDF/X-1a or PDF/X-4</li>
              </ul>
            </div>
          )},
          { id: 'delivery', title: 'Delivery Information', content: (
            <div className="text-sm text-mid space-y-3">
              <p>We offer a range of delivery options to suit your needs:</p>
              <div className="space-y-2">
                {[
                  { name: 'Standard Delivery (5-7 days)', price: '£3.99' },
                  { name: 'Express Delivery (3-4 days)', price: '£5.99' },
                  { name: 'Next Day Delivery', price: '£9.99' },
                  { name: 'Free Delivery', price: 'On orders over £50' },
                ].map(d => (
                  <div key={d.name} className="flex justify-between border-b border-gray-50 pb-2">
                    <span>{d.name}</span>
                    <span className="font-medium">{d.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )},
          { id: 'faq', title: 'FAQs', content: (
            <div className="space-y-4">
              {faqs.map(f => (
                <div key={f.q}>
                  <p className="font-medium text-dark mb-1">{f.q}</p>
                  <p className="text-sm text-mid">{f.a}</p>
                </div>
              ))}
            </div>
          )},
        ].map(section => (
          <div key={section.id} className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold">{section.title}</span>
              {openSection === section.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openSection === section.id && (
              <div className="px-6 pb-6 border-t border-gray-50">
                <div className="pt-4">{section.content}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
