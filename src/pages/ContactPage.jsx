import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Check } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', orderRef: '' });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold mb-3">Get in Touch</h1>
        <p className="text-mid text-lg max-w-xl mx-auto">We're here to help with any questions about your order, artwork, or products.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Methods */}
        <div className="space-y-4">
          {[
            { icon: Phone, title: 'Phone', value: '0800 123 4567', sub: 'Mon–Fri 8am–6pm', link: 'tel:08001234567' },
            { icon: Mail, title: 'Email', value: 'hello@printshop.com', sub: 'We reply within 2 hours', link: 'mailto:hello@printshop.com' },
            { icon: MessageSquare, title: 'Live Chat', value: 'Chat with us', sub: 'Instant support available', link: '#' },
            { icon: MapPin, title: 'Address', value: '12 Print Quarter', sub: 'London, EC1A 1BB', link: null },
          ].map(({ icon: Icon, title, value, sub, link }) => (
            <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={18} className="text-brand-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                {link ? (
                  <a href={link} className="text-brand-600 hover:underline text-sm">{value}</a>
                ) : (
                  <p className="text-sm text-dark">{value}</p>
                )}
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}

          <div className="bg-soft rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} className="text-brand-600" />
              <p className="font-semibold text-sm">Opening Hours</p>
            </div>
            <div className="space-y-1.5 text-sm">
              {[
                ['Monday – Friday', '8:00am – 6:00pm'],
                ['Saturday', '9:00am – 4:00pm'],
                ['Sunday', 'Closed'],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between text-mid">
                  <span>{day}</span>
                  <span className="font-medium text-dark">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={28} className="text-emerald-500" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-mid">Thanks for getting in touch. We'll get back to you within 2 hours during business hours.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="font-display text-xl font-bold mb-6">Send us a message</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Your Name', name: 'name', placeholder: 'Jane Smith', half: true },
                  { label: 'Email Address', name: 'email', placeholder: 'jane@example.com', half: true },
                  { label: 'Subject', name: 'subject', placeholder: 'How can we help?', half: false },
                  { label: 'Order Reference (optional)', name: 'orderRef', placeholder: 'PS12345', half: false },
                ].map(f => (
                  <div key={f.name} className={f.half ? 'col-span-1' : 'col-span-2'}>
                    <label className="block text-sm font-medium mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      value={form[f.name]}
                      onChange={e => update(f.name, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us more about your query..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-400 resize-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setSent(true)}
                className="mt-4 bg-brand-500 hover:bg-brand-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
