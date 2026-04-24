import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '../context/store';

const steps = ['Delivery', 'Payment', 'Review'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${i <= current ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
            {i < current ? <Check size={14} /> : <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs">{i + 1}</span>}
            {step}
          </div>
          {i < steps.length - 1 && <div className={`h-px w-8 ${i < current ? 'bg-brand-500' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address1: '', address2: '',
    city: '', postcode: '', country: 'United Kingdom', phone: '',
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
    saveCard: false, sameAsBilling: true,
  });
  const [errors, setErrors] = useState({});

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const delivery = total >= 50 ? 0 : 3.99;
  const vat = total * 0.2;
  const grandTotal = total + delivery + vat;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Required';
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.address1) e.address1 = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.postcode) e.postcode = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && !validate()) return;
    setStep(s => s + 1);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const Field = ({ label, name, type = 'text', placeholder, half }) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => update(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 transition-all ${errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-brand-400'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors[name]}</p>}
    </div>
  );

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Your basket is empty</h1>
        <Link to="/products" className="bg-brand-500 text-white px-8 py-3.5 rounded-full font-semibold inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-emerald-500" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-3">Order placed!</h1>
        <p className="text-mid mb-2">Thank you for your order. We've sent a confirmation to {form.email || 'your email'}.</p>
        <p className="text-mid mb-8">Your order number is <strong>#PS{Math.floor(Math.random() * 90000) + 10000}</strong></p>
        <div className="bg-soft rounded-2xl p-6 text-left mb-8">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <div className="space-y-3">
            {['We'll review your artwork and contact you if there are any issues', 'Your order goes into production within 1 business day', 'You'll receive tracking details when your order ships'].map((s, i) => (
              <div key={i} className="flex gap-3 text-sm text-mid">
                <span className="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
        <Link to="/" className="bg-brand-500 text-white px-8 py-3.5 rounded-full font-semibold inline-flex items-center gap-2">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        <ChevronRight size={14} />
        <span className="text-dark">Checkout</span>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <Lock size={18} className="text-brand-500" />
        <h1 className="font-display text-2xl font-bold">Secure Checkout</h1>
      </div>

      <StepIndicator current={step} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {/* Step 0: Delivery */}
            {step === 0 && (
              <div>
                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <Truck size={20} className="text-brand-500" /> Delivery Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email Address" name="email" type="email" placeholder="your@email.com" />
                  <Field label="First Name" name="firstName" placeholder="John" half />
                  <Field label="Last Name" name="lastName" placeholder="Smith" half />
                  <Field label="Address Line 1" name="address1" placeholder="123 High Street" />
                  <Field label="Address Line 2 (optional)" name="address2" placeholder="Apartment, suite, etc." />
                  <Field label="City" name="city" placeholder="London" half />
                  <Field label="Postcode" name="postcode" placeholder="SW1A 1AA" half />
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-dark mb-1.5">Country</label>
                    <select
                      value={form.country}
                      onChange={e => update('country', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
                    >
                      {['United Kingdom', 'Ireland', 'France', 'Germany', 'Netherlands', 'Spain', 'Italy'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <Field label="Phone Number" name="phone" type="tel" placeholder="+44 7700 000000" />
                </div>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard size={20} className="text-brand-500" /> Payment Details
                </h2>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6 flex items-center gap-2 text-sm text-blue-700">
                  <Lock size={14} className="shrink-0" />
                  Your payment is secured with 256-bit SSL encryption
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-dark mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={e => update('cardNumber', e.target.value.replace(/[^0-9]/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      maxLength={7}
                      value={form.expiry}
                      onChange={e => update('expiry', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1.5">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={4}
                      value={form.cvv}
                      onChange={e => update('cvv', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400 font-mono"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-dark mb-1.5">Name on Card</label>
                    <input
                      type="text"
                      placeholder="John Smith"
                      value={form.nameOnCard}
                      onChange={e => update('nameOnCard', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4">
                  {['visa', 'mastercard', 'amex', 'paypal'].map(card => (
                    <div key={card} className="border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-mono uppercase text-gray-400">{card}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div>
                <h2 className="font-display text-xl font-bold mb-6">Order Review</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.key} className="flex gap-3 p-3 bg-soft rounded-xl">
                      <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <p className="font-semibold text-sm">£{(item.product.price * item.qty).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-soft rounded-xl p-4 text-sm space-y-2">
                  <h3 className="font-semibold mb-2">Delivery Address</h3>
                  <p className="text-mid">{form.firstName} {form.lastName}</p>
                  <p className="text-mid">{form.address1}{form.address2 ? `, ${form.address2}` : ''}</p>
                  <p className="text-mid">{form.city}, {form.postcode}</p>
                  <p className="text-mid">{form.country}</p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  className="px-6 py-3 border border-gray-200 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  ← Back
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Continue to {steps[step + 1]} →
                </button>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Lock size={16} /> Place Order · £{grandTotal.toFixed(2)}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h3 className="font-display text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.key} className="flex items-center gap-2 text-sm">
                  <img src={item.product.image} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0" />
                  <span className="flex-1 text-mid">{item.product.name} ×{item.qty}</span>
                  <span className="font-medium">£{(item.product.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-mid">
                <span>Subtotal</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-mid">
                <span>VAT (20%)</span>
                <span>£{vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-mid">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-emerald-600 font-medium' : ''}>{delivery === 0 ? 'FREE' : `£${delivery.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>£{grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <Lock size={12} /> Secured with SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
