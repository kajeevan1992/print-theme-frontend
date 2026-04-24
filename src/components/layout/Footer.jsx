import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Star, Shield, Leaf, Award, Clock } from 'lucide-react';

const footerLinks = {
  Products: [
    { label: "What's New", to: "/products?filter=new" },
    { label: "Most Popular", to: "/products?filter=popular" },
    { label: "Wedding", to: "/products?cat=wedding" },
    { label: "View All Products", to: "/products" },
    { label: "Special Finishes", to: "/special-finishes" },
    { label: "Bespoke Service", to: "/bespoke" },
    { label: "Special Offers", to: "/special-offers" },
    { label: "Free Sample Packs", to: "/samples" },
  ],
  "Learn More": [
    { label: "Delivery", to: "/delivery" },
    { label: "Paper Information", to: "/paper-guide" },
    { label: "Tools & Services", to: "/tools" },
    { label: "Blog", to: "/blog" },
    { label: "Rewards", to: "/rewards" },
    { label: "Printed Promise", to: "/promise" },
    { label: "Affiliate Programme", to: "/affiliate" },
    { label: "Referral Scheme", to: "/referral" },
  ],
  "Here to Help": [
    { label: "Contact Us", to: "/contact" },
    { label: "FAQs", to: "/faq" },
    { label: "Apply for Account", to: "/trade" },
    { label: "Charity Benefits", to: "/charity" },
    { label: "Education Benefits", to: "/education" },
    { label: "Student Discount", to: "/student" },
    { label: "Wedding Trade Discount", to: "/wedding-trade" },
    { label: "Printed Plus", to: "/plus" },
  ],
  "About Us": [
    { label: "Our Print Facility", to: "/about/facility" },
    { label: "Our Environment", to: "/about/environment" },
    { label: "The Printed Group", to: "/about/group" },
    { label: "Careers", to: "/about/careers" },
  ],
};

const trustBadges = [
  { icon: <Star size={18} fill="currentColor" />, label: "4.9/5 Rating", sub: "50,000+ reviews" },
  { icon: <Shield size={18} />, label: "Printed Promise", sub: "Quality guaranteed" },
  { icon: <Leaf size={18} />, label: "Eco Friendly", sub: "Carbon neutral print" },
  { icon: <Clock size={18} />, label: "Fast Dispatch", sub: "Next day available" },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      {/* Trust Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-brand-400 shrink-0">{badge.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{badge.label}</p>
                  <p className="text-gray-400 text-xs">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Strip */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-sm font-semibold text-gray-300 mr-4">Get in touch:</p>
            <a href="tel:08001234567" className="flex items-center gap-2 text-sm hover:text-brand-400 transition-colors">
              <Phone size={15} /> 0800 123 4567
            </a>
            <a href="mailto:hello@printshop.com" className="flex items-center gap-2 text-sm hover:text-brand-400 transition-colors">
              <Mail size={15} /> hello@printshop.com
            </a>
            <button className="flex items-center gap-2 text-sm hover:text-brand-400 transition-colors">
              <MessageSquare size={15} /> Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-500 rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs">P</span>
            </div>
            <span className="font-display font-bold">PrintShop</span>
          </div>
          <p className="text-gray-500 text-xs">© 2026 PrintShop Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
