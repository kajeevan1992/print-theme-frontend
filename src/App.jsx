import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Gift,
  Headset,
  HeartHandshake,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  SwatchBook,
  Truck,
  Upload,
  User,
  X,
} from 'lucide-react';

const COLORS = {
  ink: '#111723',
  text: '#627185',
  line: '#E5E9F0',
  surface: '#FFFFFF',
  bg: '#F7F8FB',
  bg2: '#F1F3F7',
  cyan: '#14A7D4',
  purple: '#7B42F6',
  yellow: '#FFC843',
  mint: '#A7F0D8',
  peach: '#FFE6C5',
};

const categories = [
  {
    title: 'Business Cards',
    text: 'Luxury, recycled and everyday cards with premium finishes.',
    badge: 'Most popular',
    href: '/business-cards',
    colors: ['#DDF6FF', '#F4ECFF'],
  },
  {
    title: 'Flyers & Leaflets',
    text: 'Promotional print for menus, launches, offers and events.',
    badge: 'Bright print',
    href: '#',
    colors: ['#FFF4CB', '#FFE3E7'],
  },
  {
    title: 'Posters & Signage',
    text: 'Large-format products for retail, exhibitions and walls.',
    badge: 'Fast turnaround',
    href: '#',
    colors: ['#E9F5FF', '#E8FFF9'],
  },
];

const featuredProducts = [
  {
    title: 'Standard Business Cards',
    from: 'From £21.99',
    meta: '500 pcs · 350gsm · Matte',
    badge: 'Best seller',
  },
  {
    title: 'Luxury Business Cards',
    from: 'From £31.50',
    meta: 'Soft touch · Foil options',
    badge: 'Premium',
  },
  {
    title: 'Square Business Cards',
    from: 'From £24.40',
    meta: 'Unique format · Bold branding',
    badge: 'Creative',
  },
  {
    title: 'Rounded Corner Cards',
    from: 'From £25.80',
    meta: 'Smooth finish · Modern look',
    badge: 'Popular',
  },
];

const options = {
  stock: ['350gsm Silk', '400gsm Matte', '450gsm Soft Touch', 'Recycled Kraft'],
  corners: ['Standard corners', 'Rounded corners'],
  sides: ['Single-sided', 'Double-sided'],
  qty: ['250', '500', '1000', '2000'],
};

function usePath() {
  const [path, setPath] = useState(window.location.pathname || '/');
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (to) => {
    if (!to || to === '#') return;
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return { path, navigate };
}

function App() {
  const { path, navigate } = usePath();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const page = useMemo(() => {
    if (path === '/business-cards') return <BusinessCardsPage />;
    if (path === '/account') return <AccountPage />;
    return <HomePage navigate={navigate} />;
  }, [path]);

  return (
    <div className="app-shell">
      <Header
        navigate={navigate}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      {page}
      <Footer />
    </div>
  );
}

function Header({ navigate, searchOpen, setSearchOpen, menuOpen, setMenuOpen }) {
  const quickResults = [
    ['Business Cards', '/business-cards'],
    ['Luxury Business Cards', '/business-cards'],
    ['Flyers', '#'],
    ['Posters', '#'],
  ];

  return (
    <header className="site-header">
      <div className="top-strip">
        <div className="container top-strip__inner">
          <span>Free sample pack available</span>
          <span>Fast UK turnaround</span>
          <span>Friendly print support</span>
        </div>
      </div>
      <div className="container header-main">
        <button className="icon-btn mobile-only" onClick={() => setMenuOpen((s) => !s)} aria-label="menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <button className="brand" onClick={() => navigate('/')}>
          <span className="brand-mark">HP</span>
          <span>
            <strong>HOLO</strong> Print
          </span>
        </button>

        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}>
          <button onClick={() => navigate('/business-cards')}>Business Cards</button>
          <button>Flyers</button>
          <button>Posters</button>
          <button>Booklets</button>
          <button>Packaging</button>
          <button>Help <ChevronDown size={16} /></button>
        </nav>

        <div className="header-actions">
          <div className="search-wrap">
            <button className="icon-btn" onClick={() => setSearchOpen((s) => !s)} aria-label="search">
              <Search size={18} />
            </button>
            {searchOpen && (
              <div className="search-panel">
                <div className="search-panel__title">Search products</div>
                <div className="search-input">
                  <Search size={16} />
                  <input placeholder="Business cards, flyers, stickers..." />
                </div>
                <div className="search-results">
                  {quickResults.map(([label, href]) => (
                    <button key={label} onClick={() => { navigate(href); setSearchOpen(false); }}>
                      <span>{label}</span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="icon-btn" onClick={() => navigate('/account')} aria-label="account"><User size={18} /></button>
          <button className="icon-btn" aria-label="cart"><ShoppingBag size={18} /></button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <main>
      <section className="hero hero--printed">
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="eyebrow">Beautiful online printing</div>
            <h1>Premium print products with a brighter, happier shopping experience.</h1>
            <p>
              A fresh HOLO Print storefront inspired by Printed.com — image-led, commercial, premium and built to make print feel exciting from the first click.
            </p>
            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => navigate('/business-cards')}>Shop business cards</button>
              <button className="btn btn--secondary">Get instant quote</button>
            </div>
            <div className="hero__trust">
              <TrustChip icon={<Truck size={15} />} text="Fast delivery" />
              <TrustChip icon={<SwatchBook size={15} />} text="Premium papers" />
              <TrustChip icon={<HeartHandshake size={15} />} text="Friendly support" />
            </div>
          </div>

          <div className="hero-card hero-card--printed">
            <div className="mock-card mock-card--purple" />
            <div className="mock-card mock-card--yellow" />
            <div className="mock-card mock-card--cyan">
              <div className="mock-card__content">
                <div className="mock-label">HOLO Print</div>
                <div className="mock-title">Business Cards</div>
                <div className="mock-lines" />
                <div className="mock-lines short" />
              </div>
            </div>
            <div className="floating-note">Same-day artwork check</div>
            <div className="floating-note floating-note--alt">Luxury finishes available</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Shop by category</div>
              <h2>Explore our most popular print ranges</h2>
            </div>
            <button className="btn btn--secondary">View all products</button>
          </div>
          <div className="category-grid category-grid--large">
            {categories.map((item, i) => (
              <button key={item.title} className="category-card" onClick={() => navigate(item.href)}>
                <div className="category-card__image" style={{ background: `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})` }}>
                  <div className={`stack stack--${i}`}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="category-card__badge">{item.badge}</div>
                </div>
                <div className="category-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="category-card__link">Explore range <ArrowRight size={16} /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Featured products</div>
              <h2>Best-loved print favourites</h2>
            </div>
          </div>
          <div className="product-grid product-grid--featured">
            {featuredProducts.map((item, idx) => (
              <button key={item.title} className="product-card product-card--premium" onClick={() => navigate('/business-cards')}>
                <div className="product-card__art" data-tone={idx % 3}>
                  <div className="product-card__badge">{item.badge}</div>
                  <div className="mini-stack">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="product-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                  <div className="product-card__footer">
                    <strong>{item.from}</strong>
                    <span>View details <ChevronRight size={15} /></span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-strip">
            <FeatureCard icon={<Sparkles size={18} />} title="Premium finishes" text="Foils, soft touch, recycled, luxury stocks and more." />
            <FeatureCard icon={<Upload size={18} />} title="Easy artwork handoff" text="Upload now or later with a guided customer flow." />
            <FeatureCard icon={<ShieldCheck size={18} />} title="Print with confidence" text="Helpful support, clear specs and reliable quality." />
          </div>
        </div>
      </section>
    </main>
  );
}

function BusinessCardsPage() {
  const [selected, setSelected] = useState({
    stock: options.stock[0],
    corners: options.corners[0],
    sides: options.sides[1],
    qty: options.qty[1],
  });

  return (
    <main className="product-page">
      <section className="section product-hero">
        <div className="container product-layout">
          <div className="gallery-panel">
            <div className="gallery-main">
              <div className="mock-gallery-card">
                <div className="mock-gallery-card__top">HOLO Print</div>
                <div className="mock-gallery-card__title">Business Cards</div>
                <div className="mock-gallery-card__line" />
                <div className="mock-gallery-card__line short" />
              </div>
            </div>
            <div className="thumb-row">
              <div className="thumb thumb--cyan" />
              <div className="thumb thumb--purple" />
              <div className="thumb thumb--yellow" />
              <div className="thumb thumb--mint" />
            </div>
          </div>

          <aside className="buy-box">
            <div className="eyebrow">Business cards</div>
            <h1>Premium business cards</h1>
            <div className="rating-row">
              <span className="stars"><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></span>
              <span>4.9 average rating</span>
            </div>
            <p className="product-intro">
              Build a more premium first impression with clean layouts, luxury finishes and a printed-style buying experience.
            </p>

            <ConfigGroup title="Paper stock" items={options.stock} value={selected.stock} onChange={(value) => setSelected((s) => ({ ...s, stock: value }))} />
            <ConfigGroup title="Corners" items={options.corners} value={selected.corners} onChange={(value) => setSelected((s) => ({ ...s, corners: value }))} />
            <ConfigGroup title="Sides" items={options.sides} value={selected.sides} onChange={(value) => setSelected((s) => ({ ...s, sides: value }))} />
            <ConfigGroup title="Quantity" items={options.qty} value={selected.qty} onChange={(value) => setSelected((s) => ({ ...s, qty: value }))} compact />

            <div className="price-box">
              <span>From</span>
              <strong>£21.99</strong>
              <small>Includes artwork check</small>
            </div>

            <div className="buy-actions">
              <button className="btn btn--primary btn--block">Add to basket</button>
              <button className="btn btn--secondary btn--block">Order sample</button>
            </div>

            <div className="buy-trust">
              <TrustRow icon={<Truck size={16} />} text="Fast delivery options available" />
              <TrustRow icon={<Gift size={16} />} text="Luxury finishes and foils available" />
              <TrustRow icon={<CreditCard size={16} />} text="Easy reordering for repeat jobs" />
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container details-grid">
          <InfoCard title="Why choose these cards" icon={<Sparkles size={18} />}>
            Rich colour, clean cut edges, premium paper choices and a much stronger first impression for your brand.
          </InfoCard>
          <InfoCard title="Artwork made simple" icon={<Upload size={18} />}>
            Upload now or later, with room for proofing and approval states when you connect your backend.
          </InfoCard>
          <InfoCard title="Helpful print support" icon={<Headset size={18} />}>
            Ideal for customers who want confidence around stock, finish and delivery before placing the order.
          </InfoCard>
        </div>
      </section>

      <section className="section">
        <div className="container faq-grid">
          <div>
            <div className="eyebrow">Product details</div>
            <h2>Built for a premium online print storefront</h2>
            <div className="detail-list">
              <DetailRow label="Popular sizes" value="85 × 55 mm, square, custom" />
              <DetailRow label="Finishes" value="Matte, silk, soft touch, foiled" />
              <DetailRow label="Turnaround" value="Standard and express options" />
            </div>
          </div>
          <div className="faq-card">
            <h3>Frequently asked questions</h3>
            <FaqItem q="Can I upload artwork later?" a="Yes — the storefront can support upload-now or upload-later customer flows." />
            <FaqItem q="Do you offer premium stocks?" a="Yes — the product UI is designed around premium papers, finishes and upgrades." />
            <FaqItem q="Can customers reorder quickly?" a="Yes — the long-term account flow is built around repeat ordering and job management." />
          </div>
        </div>
      </section>
    </main>
  );
}

function AccountPage() {
  return (
    <main className="section">
      <div className="container account-empty">
        <div className="account-empty__card">
          <div className="eyebrow">Customer dashboard</div>
          <h1>Start your first print job</h1>
          <p>
            This dashboard is intentionally ready for orders, artwork, proofs and delivery updates. Until API data is connected, it shows a helpful first-step state instead of feeling empty.
          </p>
          <div className="account-empty__actions">
            <button className="btn btn--primary">Start first order</button>
            <button className="btn btn--secondary">Upload artwork</button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ConfigGroup({ title, items, value, onChange, compact = false }) {
  return (
    <div className="config-group">
      <div className="config-group__title">{title}</div>
      <div className={`config-group__grid ${compact ? 'config-group__grid--compact' : ''}`}>
        {items.map((item) => (
          <button key={item} className={`option-card ${value === item ? 'option-card--active' : ''}`} onClick={() => onChange(item)}>
            <span>{item}</span>
            {value === item && <Check size={15} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function TrustChip({ icon, text }) {
  return <span className="trust-chip">{icon}{text}</span>;
}

function TrustRow({ icon, text }) {
  return <div className="trust-row">{icon}<span>{text}</span></div>;
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div className="info-card">
      <div className="feature-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="faq-item">
      <div className="faq-item__q"><CircleHelp size={16} />{q}</div>
      <p>{a}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark">HP</span><span><strong>HOLO</strong> Print</span></div>
          <p className="footer-copy">A fresh print storefront theme inspired by the structure and confidence of leading online print shops.</p>
        </div>
        <div>
          <h4>Products</h4>
          <a>Business Cards</a>
          <a>Flyers</a>
          <a>Posters</a>
          <a>Booklets</a>
        </div>
        <div>
          <h4>Help</h4>
          <a>Delivery</a>
          <a>Artwork Guide</a>
          <a>Samples</a>
          <a>Contact</a>
        </div>
        <div>
          <h4>Customer</h4>
          <a>Account</a>
          <a>Orders</a>
          <a>Artwork Upload</a>
          <a>Reorder</a>
        </div>
      </div>
    </footer>
  );
}

export default App;
