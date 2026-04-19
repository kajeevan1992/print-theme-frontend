
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Menu,
  Minus,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Upload,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BRAND = {
  bg: "#F2F4F5",
  bg2: "#EEF1F3",
  panel: "#FFFFFF",
  panelSoft: "#FAFBFB",
  line: "#E2E6E8",
  ink: "#121517",
  muted: "#667179",
  primary: "rgb(24, 167, 208)",
  primaryDark: "#127B98",
  black: "#0F1012",
};

const NAV_ITEMS = [
  {
    label: "Business Cards",
    path: "/standard-business-cards",
    feature: {
      title: "Professional business cards",
      body: "Premium presentation for your brand, team and customer touchpoints.",
      image: "/images/business-card-front.svg",
      cta: "Shop business cards",
    },
    columns: [
      {
        title: "Popular styles",
        links: [["Standard Business Cards", "/standard-business-cards"], ["Premium Business Cards", "/standard-business-cards"], ["Rounded Corner Cards", "/standard-business-cards"], ["Loyalty Cards", "/all-products"]],
      },
      {
        title: "By finish",
        links: [["Matte", "/standard-business-cards"], ["Gloss", "/standard-business-cards"], ["Soft Touch", "/standard-business-cards"], ["Recycled", "/standard-business-cards"]],
      },
      {
        title: "Business essentials",
        links: [["Letterheads", "/all-products"], ["Compliment Slips", "/all-products"], ["Presentation Folders", "/all-products"], ["Name Badges", "/all-products"]],
      },
    ],
  },
  {
    label: "Flyers",
    path: "/flyers",
    feature: {
      title: "Flyers and leaflets",
      body: "Compact, promotional print for campaigns, menus and events.",
      image: "/images/flyer-front.svg",
      cta: "View flyers",
    },
    columns: [
      {
        title: "Flyer formats",
        links: [["A6 Flyers", "/flyers"], ["A5 Flyers", "/flyers"], ["A4 Flyers", "/flyers"], ["DL Flyers", "/flyers"]],
      },
      {
        title: "Marketing print",
        links: [["Leaflets", "/flyers"], ["Menus", "/flyers"], ["Promotional Handouts", "/flyers"], ["Event Sheets", "/flyers"]],
      },
      {
        title: "Related products",
        links: [["Posters", "/posters-large-format-prints"], ["Booklets", "/booklets"], ["Brochures", "/booklets"], ["Stickers", "/all-products"]],
      },
    ],
  },
  {
    label: "Posters",
    path: "/posters-large-format-prints",
    feature: {
      title: "Posters and large format",
      body: "Strong image-led products for displays, signage and retail promotion.",
      image: "/images/poster-main.svg",
      cta: "Explore posters",
    },
    columns: [
      {
        title: "Large format",
        links: [["A3 Posters", "/posters-large-format-prints"], ["A2 Posters", "/posters-large-format-prints"], ["A1 Posters", "/posters-large-format-prints"], ["A0 Posters", "/posters-large-format-prints"]],
      },
      {
        title: "Display products",
        links: [["Roller Banners", "/all-products"], ["PVC Banners", "/all-products"], ["Foamex Boards", "/all-products"], ["Window Graphics", "/all-products"]],
      },
      {
        title: "Signage",
        links: [["Indoor Signage", "/all-products"], ["Outdoor Signage", "/all-products"], ["Retail POS", "/all-products"], ["Event Signage", "/all-products"]],
      },
    ],
  },
  {
    label: "Booklets",
    path: "/booklets",
    feature: {
      title: "Booklets and brochures",
      body: "Editorial-style layouts for stitched, wiro and premium bound print.",
      image: "/images/hero-slide-2.svg",
      cta: "Shop booklets",
    },
    columns: [
      {
        title: "Booklet types",
        links: [["Stapled Booklets", "/booklets"], ["Wiro Bound", "/booklets"], ["Perfect Bound", "/booklets"], ["Brochures", "/booklets"]],
      },
      {
        title: "Use cases",
        links: [["Company Profiles", "/booklets"], ["Product Brochures", "/booklets"], ["Lookbooks", "/booklets"], ["Manuals", "/booklets"]],
      },
      {
        title: "Related items",
        links: [["Flyers", "/flyers"], ["Presentation Folders", "/all-products"], ["Posters", "/posters-large-format-prints"], ["Custom Quote", "/bespoke-quote"]],
      },
    ],
  },
  {
    label: "Labels",
    path: "/all-products",
    feature: {
      title: "Labels and stickers",
      body: "Product labels, sticker sheets and packaging-ready print.",
      image: "/images/hero-slide-3.svg",
      cta: "Browse labels",
    },
    columns: [
      {
        title: "Label products",
        links: [["Bottle Labels", "/all-products"], ["Product Labels", "/all-products"], ["Sticker Sheets", "/all-products"], ["Window Stickers", "/all-products"]],
      },
      {
        title: "Packaging print",
        links: [["Sleeves", "/all-products"], ["Packaging Inserts", "/all-products"], ["Branded Seals", "/all-products"], ["Custom Packaging", "/bespoke-quote"]],
      },
      {
        title: "Support",
        links: [["Artwork Help", "/bespoke-quote"], ["Material Advice", "/bespoke-quote"], ["Bulk Pricing", "/bespoke-quote"], ["Get a Quote", "/bespoke-quote"]],
      },
    ],
  },
  {
    label: "Stationery",
    path: "/all-products",
    feature: {
      title: "Professional stationery",
      body: "Core office and brand stationery with a calm, polished presentation.",
      image: "/images/hero-slide-1.svg",
      cta: "View stationery",
    },
    columns: [
      {
        title: "Essentials",
        links: [["Letterheads", "/all-products"], ["Compliment Slips", "/all-products"], ["NCR Pads", "/all-products"], ["Notepads", "/all-products"]],
      },
      {
        title: "Branded print",
        links: [["Presentation Folders", "/all-products"], ["Envelopes", "/all-products"], ["Notebooks", "/booklets"], ["Appointment Cards", "/all-products"]],
      },
      {
        title: "Useful links",
        links: [["Business Cards", "/standard-business-cards"], ["Booklets", "/booklets"], ["Custom Quote", "/bespoke-quote"], ["All Products", "/all-products"]],
      },
    ],
  },
  {
    label: "Signage",
    path: "/all-products",
    feature: {
      title: "Display and signage",
      body: "Retail, event and wayfinding graphics with large-format flexibility.",
      image: "/images/poster-main.svg",
      cta: "Explore signage",
    },
    columns: [
      {
        title: "Display print",
        links: [["Roller Banners", "/all-products"], ["Foamex Boards", "/all-products"], ["PVC Signs", "/all-products"], ["Window Graphics", "/all-products"]],
      },
      {
        title: "Events",
        links: [["Directional Signs", "/all-products"], ["Exhibition Panels", "/all-products"], ["Outdoor Banners", "/all-products"], ["Promotional Boards", "/all-products"]],
      },
      {
        title: "Need help?",
        links: [["Installation Advice", "/bespoke-quote"], ["Custom Sizing", "/bespoke-quote"], ["Material Guidance", "/bespoke-quote"], ["Request Quote", "/bespoke-quote"]],
      },
    ],
  },
  {
    label: "All Products",
    path: "/all-products",
    feature: {
      title: "Explore the full catalog",
      body: "A broader storefront view with cleaner sections and stronger product grouping.",
      image: "/images/hero-slide-2.svg",
      cta: "Shop all products",
    },
    columns: [
      {
        title: "Core categories",
        links: [["Business Cards", "/standard-business-cards"], ["Flyers", "/flyers"], ["Posters", "/posters-large-format-prints"], ["Booklets", "/booklets"]],
      },
      {
        title: "Expanded range",
        links: [["Labels", "/all-products"], ["Signage", "/all-products"], ["Stationery", "/all-products"], ["Packaging", "/all-products"]],
      },
      {
        title: "Custom support",
        links: [["Bespoke Quote", "/bespoke-quote"], ["Bulk Orders", "/bespoke-quote"], ["Artwork Advice", "/bespoke-quote"], ["Delivery Support", "/all-products"]],
      },
    ],
  },
  {
    label: "Bespoke Quote",
    path: "/bespoke-quote",
    feature: {
      title: "Custom print projects",
      body: "Perfect for specialist materials, unusual sizes and larger bespoke jobs.",
      image: "/images/hero-slide-3.svg",
      cta: "Request a quote",
    },
    columns: [
      {
        title: "Best for",
        links: [["Bulk Orders", "/bespoke-quote"], ["Special Finishes", "/bespoke-quote"], ["Large Projects", "/bespoke-quote"], ["Complex Specs", "/bespoke-quote"]],
      },
      {
        title: "Support",
        links: [["Artwork Help", "/bespoke-quote"], ["Material Advice", "/bespoke-quote"], ["Production Queries", "/bespoke-quote"], ["Pricing Guidance", "/bespoke-quote"]],
      },
      {
        title: "Related pages",
        links: [["All Products", "/all-products"], ["Business Cards", "/standard-business-cards"], ["Flyers", "/flyers"], ["Posters", "/posters-large-format-prints"]],
      },
    ],
  },
];

const heroSlides = [
  {
    eyebrow: "Premium print solutions",
    title: "Professional online printing with a cleaner, calmer storefront feel.",
    body:
      "A much closer visual direction to the reference screenshots: softer grey-white background, broader navigation, fuller dropdown coverage and denser ecommerce sections.",
    image: "/images/hero-slide-1.svg",
  },
  {
    eyebrow: "Built for trust",
    title: "Make browsing, ordering and quoting feel structured and premium.",
    body:
      "This theme now leans further into a real print ecommerce layout with product-led sections, review blocks, category strips and a broader footer structure.",
    image: "/images/hero-slide-2.svg",
  },
  {
    eyebrow: "Ready for scale",
    title: "A stronger storefront foundation before connecting your backend.",
    body:
      "Use the current build for presentation now, then wire product data, pricing rules, uploads and admin flows through your dashboard later.",
    image: "/images/hero-slide-3.svg",
  },
];

const catalog = {
  businessCards: {
    name: "Business Cards",
    slug: "/standard-business-cards",
    basePrice: 21.99,
    badge: "Best Seller",
    images: ["/images/business-card-front.svg", "/images/business-card-back.svg", "/images/business-card-front.svg"],
    options: {
      finish: ["Standard Matte", "Premium Gloss", "Soft Touch", "Recycled"],
      orientation: ["Landscape", "Portrait"],
      corners: ["Square", "Rounded"],
      quantity: [100, 250, 500, 1000, 2500],
    },
    specs: [
      ["Size", "85mm × 55mm"],
      ["Material", "350gsm stock"],
      ["Print", "Full colour"],
      ["Turnaround", "Standard / express"],
    ],
    description: "Compact, professional cards with cleaner controls and stronger image hierarchy.",
  },
  flyers: {
    name: "Flyers",
    slug: "/flyers",
    basePrice: 18.4,
    badge: "Popular",
    images: ["/images/flyer-front.svg", "/images/flyer-back.svg", "/images/flyer-front.svg"],
    options: {
      size: ["A6", "A5", "A4", "DL"],
      sides: ["Single Sided", "Double Sided"],
      paper: ["130gsm", "170gsm", "250gsm"],
      quantity: [100, 250, 500, 1000],
    },
    specs: [
      ["Paper", "Silk / gloss / uncoated"],
      ["Print", "Full colour"],
      ["Turnaround", "Fast production"],
      ["Use case", "Menus, promotions, events"],
    ],
    description: "Promotional print layouts that feel lighter, more structured and more sellable.",
  },
  posters: {
    name: "Posters",
    slug: "/posters-large-format-prints",
    basePrice: 8.49,
    badge: "Large Format",
    images: ["/images/poster-main.svg", "/images/poster-main.svg", "/images/poster-main.svg"],
    options: {
      size: ["A3", "A2", "A1", "A0"],
      material: ["135gsm satin", "200gsm matt", "PVC", "Vinyl"],
      finish: ["Standard", "Laminated"],
      quantity: [1, 3, 5, 10, 25],
    },
    specs: [
      ["Use", "Indoor / outdoor"],
      ["Material", "Paper, vinyl, PVC"],
      ["Print", "High-resolution colour"],
      ["Extras", "Custom sizes"],
    ],
    description: "Large-format products presented in a more reference-like, image-first structure.",
  },
};

const featuredCollections = [
  { title: "Business Cards", subtitle: "Premium cards for teams and brands", image: "/images/business-card-front.svg", path: "/standard-business-cards" },
  { title: "Flyers & Leaflets", subtitle: "Menus, handouts and promotions", image: "/images/flyer-front.svg", path: "/flyers" },
  { title: "Posters & Large Format", subtitle: "Display graphics and event print", image: "/images/poster-main.svg", path: "/posters-large-format-prints" },
  { title: "Booklets", subtitle: "Brochures, manuals and stitched print", image: "/images/hero-slide-2.svg", path: "/booklets" },
  { title: "Labels", subtitle: "Bottle, product and packaging labels", image: "/images/hero-slide-3.svg", path: "/all-products" },
  { title: "Stationery", subtitle: "Branded office and presentation materials", image: "/images/hero-slide-1.svg", path: "/all-products" },
];

const featuredProducts = [
  { title: "Standard Business Cards", price: "From £21.99", badge: "Best Seller", image: "/images/business-card-front.svg", path: "/standard-business-cards" },
  { title: "Premium Flyers", price: "From £18.40", badge: "Popular", image: "/images/flyer-front.svg", path: "/flyers" },
  { title: "Large Format Posters", price: "From £8.49", badge: "Fast Turnaround", image: "/images/poster-main.svg", path: "/posters-large-format-prints" },
  { title: "Wiro Bound Booklets", price: "From £34.00", badge: "Professional", image: "/images/hero-slide-2.svg", path: "/booklets" },
];

const trustBadges = [
  { icon: ShieldCheck, title: "Professional Quality", text: "Cleaner white cards, calmer hierarchy and a more reference-like storefront tone." },
  { icon: Truck, title: "Fast Turnaround", text: "Useful for urgent print jobs and repeat customer reorders." },
  { icon: Package, title: "Custom Options", text: "Ready for more product options, quote routes and add-ons." },
  { icon: Star, title: "Commerce Ready", text: "Built to feel more like a complete production storefront." },
];

const testimonials = [
  { quote: "The new layout feels much more premium and easier to navigate.", name: "Marketing Lead", company: "Studio Brand Co." },
  { quote: "Cleaner typography and denser content blocks made the store feel more credible.", name: "Operations Manager", company: "Northway Events" },
  { quote: "The category structure and dropdowns feel much closer to a real print commerce site.", name: "Founder", company: "Urban Retail Print" },
];

const faqItems = [
  ["Can I upload artwork later?", "Yes. The storefront can be extended so artwork upload happens after add-to-cart or after quote approval."],
  ["Can this connect to my admin dashboard?", "Yes. The current theme is frontend-first and structured so product, stock and order data can be connected later."],
  ["Can I request custom print sizes?", "Yes. Use the bespoke quote flow for custom jobs, specialist materials and bulk pricing."],
  ["Can pricing be made dynamic?", "Yes. Product pages can be wired to live pricing rules and option matrices from your backend."],
];

const pricingGrid = [
  { qty: "100 pcs", price: "£12.00" },
  { qty: "250 pcs", price: "£18.00" },
  { qty: "500 pcs", price: "£27.00" },
  { qty: "1000 pcs", price: "£44.00" },
];

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function usePathState() {
  const getPath = () => window.location.pathname || "/";
  const [path, setPath] = useState(getPath());

  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (next) => {
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function useCart() {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("holo-cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("holo-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems((prev) => [...prev, { ...item, id: crypto.randomUUID(), qty: item.qty || 1 }]);
  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const updateQty = (id, delta) => setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x)));
  const clear = () => setItems([]);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { items, addItem, removeItem, updateQty, clear, subtotal };
}

function Shell({ children, narrow = false }) {
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-[1220px]" : "max-w-[1360px]"}`}>{children}</div>;
}

function UtilityBar() {
  return (
    <div style={{ backgroundColor: BRAND.black, color: "white" }}>
      <Shell>
        <div className="flex h-8 items-center justify-between text-[11px] font-medium">
          <span>Professional print, signage and packaging solutions</span>
          <div className="hidden gap-5 sm:flex">
            <span>Business orders</span>
            <span>Bulk pricing</span>
            <span>Fast turnaround</span>
            <span>Bespoke quote support</span>
          </div>
        </div>
      </Shell>
    </div>
  );
}

function Header({ navigate, currentPath, cartCount, cartSubtotal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openLabel, setOpenLabel] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpenLabel(null);
    };
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-all duration-300 ${isScrolled ? "shadow-[0_12px_30px_rgba(0,0,0,0.06)]" : ""}`}
      style={{ borderColor: BRAND.line }}
    >
      <Shell>
        <div ref={wrapperRef} className="relative">
          <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-6 transition-all duration-300 ${isScrolled ? "h-[64px]" : "h-[74px]"}`}>
            <div className="flex items-center gap-3">
              <button className="rounded-xl p-2 xl:hidden" onClick={() => setMobileOpen(true)}>
                <Menu className="h-5 w-5" />
              </button>
              <button onClick={() => navigate("/")} className="flex items-center gap-0.5">
                <span className="text-[40px] font-black tracking-[-0.05em]" style={{ color: BRAND.primary }}>HOLO</span>
                <span className="text-[40px] font-black tracking-[-0.05em]" style={{ color: BRAND.ink }}>PRINT</span>
              </button>
            </div>

            <nav className="hidden items-center justify-center gap-5 xl:flex">
              {NAV_ITEMS.map((item) => {
                const active = currentPath === item.path;
                const open = openLabel === item.label;
                return (
                  <button
                    key={item.label}
                    className="inline-flex items-center gap-1 text-[13px] font-semibold"
                    style={{ color: active || open ? BRAND.primary : BRAND.ink }}
                    onMouseEnter={() => setOpenLabel(item.label)}
                    onClick={() => {
                      setOpenLabel(item.label);
                      navigate(item.path);
                    }}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
                  </button>
                );
              })}
            </nav>

            <div className="ml-auto flex items-center gap-2">
              <IconButton icon={<Search className="h-4 w-4" />} />
              <IconButton icon={<User className="h-4 w-4" />} />
              <button
                onClick={() => navigate("/cart")}
                className="flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-semibold"
                style={{ borderColor: BRAND.line, color: BRAND.muted, backgroundColor: "white" }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span>{currency(cartSubtotal)}</span>
                {cartCount > 0 && (
                  <span className="rounded-full px-1.5 py-0.5 text-[10px] text-white" style={{ backgroundColor: BRAND.primary }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {openLabel && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.18 }}
                onMouseLeave={() => setOpenLabel(null)}
                className="absolute left-0 right-0 top-full hidden xl:block"
              >
                <div className="mt-2 rounded-[20px] border bg-white p-5 shadow-[0_26px_80px_rgba(0,0,0,0.10)]" style={{ borderColor: BRAND.line }}>
                  {(() => {
                    const item = NAV_ITEMS.find((x) => x.label === openLabel) || NAV_ITEMS[0];
                    return (
                      <div className="grid grid-cols-[250px_1fr_1fr_1fr] gap-6">
                        <div className="rounded-[18px] border p-4" style={{ borderColor: BRAND.line, backgroundColor: BRAND.panelSoft }}>
                          <img src={item.feature.image} alt={item.feature.title} className="h-36 w-full rounded-[12px] object-cover" />
                          <div className="mt-4 text-[18px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>
                            {item.feature.title}
                          </div>
                          <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>
                            {item.feature.body}
                          </p>
                          <button onClick={() => navigate(item.path)} className="mt-4 text-[12px] font-bold" style={{ color: BRAND.primary }}>
                            {item.feature.cta}
                          </button>
                        </div>

                        {item.columns.map((column) => (
                          <div key={column.title}>
                            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
                              {column.title}
                            </div>
                            <div className="grid gap-1">
                              {column.links.map(([label, path]) => (
                                <button
                                  key={label}
                                  onClick={() => {
                                    navigate(path);
                                    setOpenLabel(null);
                                  }}
                                  className="rounded-xl px-3 py-2 text-left text-[12px] font-medium hover:bg-[#F6F7F8]"
                                  style={{ color: BRAND.ink }}
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Shell>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/25 xl:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-[320px] bg-white p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <div className="text-[24px] font-black">Menu</div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  className="rounded-xl px-3 py-3 text-left text-[14px] font-semibold hover:bg-[#F6F7F8]"
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function IconButton({ icon }) {
  return <div className="grid h-9 w-9 place-items-center rounded-xl border bg-white" style={{ borderColor: BRAND.line }}>{icon}</div>;
}

function Hero({ navigate }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % heroSlides.length), 4600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b" style={{ borderColor: BRAND.line, backgroundColor: BRAND.panelSoft }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(24,167,208,0.07),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.03),transparent_24%)]" />
      <Shell>
        <div className="relative grid min-h-[470px] items-center gap-10 py-8 lg:grid-cols-[1.02fr_0.98fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-[#F1FAFD] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
                {heroSlides[active].eyebrow}
              </div>
              <h1 className="max-w-[640px] text-[56px] font-black leading-[0.97] tracking-[-0.05em] sm:text-[64px]" style={{ color: BRAND.ink }}>
                {heroSlides[active].title}
              </h1>
              <p className="mt-5 max-w-[600px] text-[14px] leading-7" style={{ color: BRAND.muted }}>
                {heroSlides[active].body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => navigate("/all-products")}>Browse Products</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/bespoke-quote")}>Request Bespoke Quote</SecondaryButton>
              </div>
              <div className="mt-5 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} className="h-2.5 rounded-full transition-all" style={{ width: i === active ? 28 : 8, backgroundColor: i === active ? BRAND.primary : "#D4D9DD" }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="justify-self-center lg:justify-self-end">
            <div className="overflow-hidden rounded-[22px] border bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,0.05)]" style={{ borderColor: BRAND.line }}>
              <img src={heroSlides[active].image} alt="Hero" className="h-[315px] w-[490px] max-w-full rounded-[16px] object-cover" />
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function HomePage({ navigate }) {
  return (
    <div>
      <Hero navigate={navigate} />

      <section className="py-5">
        <Shell>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["Business Cards", "Flyers", "Posters", "Booklets", "Labels", "Signage", "Packaging", "Stationery"].map((item) => (
              <button key={item} className="whitespace-nowrap rounded-full border bg-white px-4 py-2 text-[12px] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.02)]" style={{ borderColor: BRAND.line }}>
                {item}
              </button>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {trustBadges.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[18px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#F1FAFD]" style={{ color: BRAND.primary }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 text-[15px] font-bold" style={{ color: BRAND.ink }}>{item.title}</div>
                  <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <SectionHeading eyebrow="Collections" title="Shop our most-used print categories" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredCollections.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group rounded-[18px] border bg-white p-4 text-left shadow-[0_10px_24px_rgba(0,0,0,0.03)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
                style={{ borderColor: BRAND.line }}
              >
                <div className="overflow-hidden rounded-[14px]">
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 text-[18px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>{item.title}</div>
                <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>{item.subtitle}</p>
              </button>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <SectionHeading eyebrow="Featured products" title="Popular print products with a cleaner card structure" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.path)}
                className="group rounded-[18px] border bg-white p-4 text-left shadow-[0_10px_24px_rgba(0,0,0,0.03)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_34px_rgba(0,0,0,0.05)]"
                style={{ borderColor: BRAND.line }}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#F1FAFD] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: BRAND.primary }}>
                    {item.badge}
                  </span>
                  <span className="text-[11px]" style={{ color: BRAND.muted }}>In stock</span>
                </div>
                <div className="mt-3 overflow-hidden rounded-[14px]">
                  <img src={item.image} alt={item.title} className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-4 text-[15px] font-bold" style={{ color: BRAND.ink }}>{item.title}</div>
                <div className="mt-1 text-[12px]" style={{ color: BRAND.muted }}>{item.price}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: BRAND.primary }}>
                  View details <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[20px] border bg-white shadow-[0_12px_28px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
                    Why this feels more complete
                  </div>
                  <div className="mt-3 max-w-[380px] text-[30px] font-black leading-[1.04] tracking-[-0.04em]" style={{ color: BRAND.ink }}>
                    Broader structure, denser sections and more reference-like navigation.
                  </div>
                  <p className="mt-3 max-w-[380px] text-[12px] leading-6" style={{ color: BRAND.muted }}>
                    The homepage now carries more of the visual density from the examples: category strips, trust cards, featured collections, product rows, reviews and FAQ.
                  </p>
                  <div className="mt-5 grid gap-2">
                    {["Featured collections", "Trust badges", "Reviews and FAQ", "Quote and cart flow"].map((x) => (
                      <div key={x} className="flex items-center gap-2 text-[12px]" style={{ color: BRAND.muted }}>
                        <Check className="h-4 w-4" style={{ color: BRAND.primary }} />
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
                <img src="/images/hero-slide-2.svg" alt="Showcase" className="h-full min-h-[300px] w-full object-cover" />
              </div>
            </div>

            <div className="grid gap-4">
              {testimonials.map((item) => (
                <div key={item.name} className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                  <div className="flex gap-1" style={{ color: BRAND.primary }}>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="mt-3 text-[13px] leading-6" style={{ color: BRAND.ink }}>
                    “{item.quote}”
                  </p>
                  <div className="mt-3 text-[12px] font-bold" style={{ color: BRAND.ink }}>{item.name}</div>
                  <div className="text-[11px]" style={{ color: BRAND.muted }}>{item.company}</div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Choose your product", "Browse cards, flyers, posters, labels and more."],
              ["Upload artwork or request help", "Use artwork later or move through a bespoke quote flow."],
              ["Approve and receive delivery", "Keep the customer journey simple and clear."],
            ].map(([title, text], i) => (
              <div key={title} className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                <div className="grid h-8 w-8 place-items-center rounded-full text-[12px] font-bold text-white" style={{ backgroundColor: BRAND.primary }}>
                  {i + 1}
                </div>
                <div className="mt-4 text-[16px] font-bold" style={{ color: BRAND.ink }}>{title}</div>
                <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>{text}</p>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <SectionHeading eyebrow="Pricing options" title="Simple starter pricing blocks" />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pricingGrid.map((item) => (
              <div key={item.qty} className="rounded-[18px] border bg-white p-5 text-center shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                <div className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.muted }}>{item.qty}</div>
                <div className="mt-3 text-[28px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>{item.price}</div>
                <div className="mt-2 text-[12px]" style={{ color: BRAND.muted }}>Base visual pricing block</div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
                  Delivery estimator
                </div>
                <div className="mt-2 text-[24px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>
                  Estimate dispatch and delivery
                </div>
                <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>
                  A more complete ecommerce storefront often includes delivery expectation or postcode-based guidance.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input className="h-11 rounded-xl border text-[12px]" placeholder="Enter postcode" style={{ borderColor: BRAND.line }} />
                <PrimaryButton className="justify-center">Check delivery</PrimaryButton>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      <section className="py-5">
        <Shell>
          <div className="rounded-[18px] border bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <SectionHeading eyebrow="Frequently asked questions" title="Common questions before customers order" compact />
            <div className="grid gap-3">
              {faqItems.map(([q, a]) => (
                <div key={q} className="rounded-[14px] border bg-[#FBFBFB] p-4" style={{ borderColor: BRAND.line }}>
                  <div className="text-[13px] font-bold" style={{ color: BRAND.ink }}>{q}</div>
                  <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, compact = false }) {
  return (
    <div className={compact ? "mb-4" : "mb-5 flex items-end justify-between"}>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
          {eyebrow}
        </div>
        <h2 className="mt-2 text-[28px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
          {title}
        </h2>
      </div>
    </div>
  );
}

function ProductPage({ type, cart }) {
  const product = catalog[type];
  const optionKeys = Object.keys(product.options);
  const defaults = {};
  optionKeys.forEach((k) => (defaults[k] = product.options[k][0]));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selected, setSelected] = useState(defaults);

  const price = useMemo(() => {
    let result = product.basePrice;
    const quantity = selected.quantity;
    if (typeof quantity === "number") result += quantity > 500 ? 5.5 : quantity > 100 ? 2.5 : 0;
    return Number(result.toFixed(2));
  }, [selected, product]);

  return (
    <section className="py-6">
      <Shell narrow>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_360px]">
          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <div className="mb-5 border-b pb-4" style={{ borderColor: BRAND.line }}>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#F1FAFD] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.primary }}>
                  {product.badge}
                </span>
                <span className="text-[11px]" style={{ color: BRAND.muted }}>Image-first product layout</span>
              </div>
              <h1 className="mt-3 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
                {product.name}
              </h1>
              <p className="mt-2 max-w-[620px] text-[12px] leading-6" style={{ color: BRAND.muted }}>
                {product.description}
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="overflow-hidden rounded-[16px] border bg-[#FAFBFC]" style={{ borderColor: BRAND.line }}>
                  <img src={product.images[selectedImage]} alt={product.name} className="h-[360px] w-full object-cover" />
                </div>
                <div className="mt-3 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className="overflow-hidden rounded-[12px] border bg-white transition hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                      style={{ borderColor: selectedImage === i ? BRAND.primary : BRAND.line }}
                    >
                      <img src={img} alt="" className="h-16 w-16 object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-5">
                {optionKeys.map((key) => (
                  <div key={key}>
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.ink }}>
                      {key}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.options[key].map((value) => {
                        const active = selected[key] === value;
                        return (
                          <button
                            key={String(value)}
                            onClick={() => setSelected((prev) => ({ ...prev, [key]: value }))}
                            className="rounded-full border px-4 py-2 text-[12px] font-semibold transition hover:-translate-y-[1px]"
                            style={{
                              borderColor: active ? BRAND.primary : BRAND.line,
                              backgroundColor: active ? "#F1FAFD" : "white",
                              color: active ? BRAND.primaryDark : BRAND.ink,
                            }}
                          >
                            {String(value)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="rounded-[14px] border bg-[#FBFBFB] p-4" style={{ borderColor: BRAND.line }}>
                  <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.ink }}>
                    Technical specifications
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {product.specs.map(([k, v]) => (
                      <div key={k} className="rounded-[12px] border bg-white px-3 py-2.5" style={{ borderColor: BRAND.line }}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.muted }}>{k}</div>
                        <div className="mt-1 text-[12px] font-semibold" style={{ color: BRAND.ink }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {pricingGrid.slice(0, 3).map((item) => (
                    <div key={item.qty} className="rounded-[12px] border bg-white p-3 text-center" style={{ borderColor: BRAND.line }}>
                      <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.muted }}>{item.qty}</div>
                      <div className="mt-2 text-[16px] font-black" style={{ color: BRAND.ink }}>{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-[18px] border bg-white p-5 shadow-[0_14px_34px_rgba(0,0,0,0.04)]" style={{ borderColor: BRAND.line }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>
                Price summary
              </div>
              <div className="mt-2 text-[40px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
                {currency(price)}
              </div>
              <div className="mt-1 text-[11px]" style={{ color: BRAND.muted }}>Base pricing before live backend rules and shipping logic</div>

              <PrimaryButton
                className="mt-5 w-full justify-center"
                onClick={() => cart.addItem({ name: product.name, config: selected, price })}
              >
                Add to cart
              </PrimaryButton>

              <SecondaryButton className="mt-3 w-full justify-center">Request a custom quote</SecondaryButton>

              <div className="mt-5 border-t pt-5" style={{ borderColor: BRAND.line }}>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.ink }}>
                  Included in this layout
                </div>
                <div className="mt-3 grid gap-2">
                  {["Image gallery", "Compact option pills", "Sticky purchase card", "Reference-style spacing"].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-[12px]" style={{ color: BRAND.muted }}>
                      <Check className="h-4 w-4" style={{ color: BRAND.primary }} />
                      {x}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[14px] border bg-[#FBFBFB] p-4" style={{ borderColor: BRAND.line }}>
                <div className="text-[12px] font-bold" style={{ color: BRAND.ink }}>Need something custom?</div>
                <p className="mt-2 text-[11px] leading-6" style={{ color: BRAND.muted }}>
                  Use the bespoke quote flow for custom sizes, specialist materials and bulk pricing requests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function BookletsPage({ navigate }) {
  return (
    <section className="py-6">
      <Shell narrow>
        <div className="rounded-[18px] border bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
            Booklet printing
          </div>
          <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
            Booklets with a cleaner, more editorial storefront layout
          </h1>
          <p className="mt-3 max-w-[660px] text-[12px] leading-6" style={{ color: BRAND.muted }}>
            This page now reflects a fuller commerce structure with lighter cards, more compact typography and cleaner category presentation.
          </p>
          <div className="mt-5 flex gap-3">
            <PrimaryButton onClick={() => navigate("/all-products")}>Browse products</PrimaryButton>
            <SecondaryButton onClick={() => navigate("/bespoke-quote")}>Request quote</SecondaryButton>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Stapled Booklets", "Wiro Bound Booklets", "Perfect Bound Booklets", "Spot UV Booklets", "Notebooks", "Brochures"].map((title, i) => (
            <div key={title} className="rounded-[18px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
              <img src={heroSlides[i % heroSlides.length].image} alt={title} className="h-40 w-full rounded-[14px] object-cover" />
              <div className="mt-4 text-[16px] font-bold" style={{ color: BRAND.ink }}>{title}</div>
              <p className="mt-2 text-[12px] leading-6" style={{ color: BRAND.muted }}>
                Cleaner product card spacing and a more believable print-store presentation.
              </p>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function AllProductsPage({ navigate }) {
  return (
    <section className="py-6">
      <Shell narrow>
        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <div className="rounded-[18px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>Search catalog</div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: BRAND.muted }} />
              <Input className="h-10 rounded-xl border pl-10 text-[12px]" placeholder="Search products..." style={{ borderColor: BRAND.line }} />
            </div>
            <div className="mt-4 grid gap-1">
              {["Business Cards", "Flyers", "Posters", "Booklets", "Labels", "Signage", "Packaging", "Stationery"].map((x) => (
                <button key={x} className="rounded-xl px-3 py-2 text-left text-[12px] font-medium hover:bg-[#F6F7F8]">{x}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {NAV_ITEMS.slice(0, 7).map((group) => (
              <div key={group.label} className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                <div className="text-[22px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>{group.label}</div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {group.columns.flatMap((c) => c.links).slice(0, 4).map(([label, path], i) => (
                    <button
                      key={label}
                      onClick={() => navigate(path)}
                      className="group rounded-[14px] border p-3 text-left transition hover:-translate-y-[1px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.05)]"
                      style={{ borderColor: BRAND.line }}
                    >
                      <img src={featuredProducts[i % featuredProducts.length].image} alt={label} className="h-24 w-full rounded-[10px] object-cover transition duration-500 group-hover:scale-[1.03]" />
                      <div className="mt-3 text-[13px] font-bold" style={{ color: BRAND.ink }}>{label}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function BespokeQuotePage() {
  return (
    <section className="py-6">
      <Shell narrow>
        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[18px] border bg-white p-6 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>Custom quote</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
              Request a bespoke quote for custom print jobs
            </h1>
            <p className="mt-3 max-w-[620px] text-[12px] leading-6" style={{ color: BRAND.muted }}>
              This section now sits more naturally inside the storefront and better matches the professional, compact structure from your references.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input placeholder="Full name" className="h-11 rounded-xl border text-[12px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Company" className="h-11 rounded-xl border text-[12px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Email" className="h-11 rounded-xl border text-[12px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Phone" className="h-11 rounded-xl border text-[12px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Project type" className="h-11 rounded-xl border text-[12px] sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <Textarea placeholder="Tell us about quantity, sizes, material, deadline and finishing details." className="min-h-[170px] rounded-[14px] border text-[12px] sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <PrimaryButton className="sm:col-span-2 justify-center">Get quote</PrimaryButton>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
              <div className="text-[15px] font-bold" style={{ color: BRAND.ink }}>Ideal for</div>
              <div className="mt-4 grid gap-3">
                {["Custom sizes", "Special finishes", "Bulk orders", "Complex specifications"].map((x) => (
                  <div key={x} className="flex items-center gap-2 text-[12px]" style={{ color: BRAND.muted }}>
                    <Check className="h-4 w-4" style={{ color: BRAND.primary }} />
                    {x}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
              <div className="text-[15px] font-bold" style={{ color: BRAND.ink }}>Upload artwork later</div>
              <p className="mt-3 text-[12px] leading-6" style={{ color: BRAND.muted }}>
                You can also wire artwork upload into the order or approval flow later.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[12px]" style={{ borderColor: BRAND.line }}>
                <Upload className="h-4 w-4" />
                Artwork placeholder flow
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function CartPage({ cart, navigate }) {
  return (
    <section className="py-6">
      <Shell narrow>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>Basket</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>Your cart</h1>
          </div>
          <SecondaryButton onClick={() => navigate("/all-products")}>Keep shopping</SecondaryButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4">
            {cart.items.length === 0 ? (
              <div className="rounded-[18px] border bg-white p-6 text-[12px] shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line, color: BRAND.muted }}>
                Your cart is empty.
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="rounded-[18px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-bold" style={{ color: BRAND.ink }}>{item.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(item.config || {}).map(([k, v]) => (
                          <span key={k} className="rounded-full bg-[#F6F7F8] px-3 py-1 text-[10px] font-medium" style={{ color: BRAND.muted }}>
                            {k}: {String(v)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-[18px] font-black">{currency(item.price * item.qty)}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border px-2 py-1" style={{ borderColor: BRAND.line }}>
                      <button onClick={() => cart.updateQty(item.id, -1)}><Minus className="h-4 w-4" /></button>
                      <span className="w-5 text-center text-[12px] font-semibold">{item.qty}</span>
                      <button onClick={() => cart.updateQty(item.id, 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => cart.removeItem(item.id)} className="text-[11px] font-bold" style={{ color: "#C23636" }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: BRAND.line }}>
            <div className="text-[20px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>Order summary</div>
            <div className="mt-4 space-y-3 text-[12px]" style={{ color: BRAND.muted }}>
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(cart.subtotal)}</span></div>
              <div className="flex justify-between"><span>Estimated VAT</span><span>{currency(cart.subtotal * 0.2)}</span></div>
            </div>
            <div className="mt-4 border-t pt-4" style={{ borderColor: BRAND.line }}>
              <div className="flex justify-between text-[15px] font-bold" style={{ color: BRAND.ink }}>
                <span>Total</span>
                <span>{currency(cart.subtotal)}</span>
              </div>
            </div>
            <PrimaryButton className="mt-5 w-full justify-center">Proceed</PrimaryButton>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="mt-8 border-t bg-white" style={{ borderColor: BRAND.line }}>
      <div className="border-b py-3" style={{ borderColor: BRAND.line, backgroundColor: BRAND.primary }}>
        <Shell>
          <div className="flex flex-col items-center justify-between gap-2 text-[12px] font-semibold text-white md:flex-row">
            <span>Get the very best print solutions for your business.</span>
            <div className="flex gap-2">
              <Input className="h-9 w-[250px] rounded-full border-0 bg-white text-[12px] text-black" placeholder="Email address" />
              <button className="rounded-full bg-black px-4 text-[12px] font-bold text-white">Subscribe</button>
            </div>
          </div>
        </Shell>
      </div>

      <Shell>
        <div className="grid gap-8 py-10 md:grid-cols-[1.25fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <button onClick={() => navigate("/")} className="flex items-center gap-0.5">
              <span className="text-[48px] font-black tracking-[-0.05em]" style={{ color: BRAND.primary }}>HOLO</span>
              <span className="text-[48px] font-black tracking-[-0.05em]" style={{ color: BRAND.ink }}>PRINT</span>
            </button>
            <p className="mt-4 max-w-[360px] text-[12px] leading-7" style={{ color: BRAND.muted }}>
              A fuller ecommerce print storefront direction with broader navigation, denser sections and a cleaner visual tone.
            </p>
          </div>

          <FooterCol title="Products" items={[["Business Cards", "/standard-business-cards"], ["Flyers", "/flyers"], ["Posters", "/posters-large-format-prints"], ["Booklets", "/booklets"]]} navigate={navigate} />
          <FooterCol title="Categories" items={[["Labels", "/all-products"], ["Stationery", "/all-products"], ["Signage", "/all-products"], ["Packaging", "/all-products"]]} navigate={navigate} />
          <FooterCol title="Business" items={[["Bulk pricing", "/bespoke-quote"], ["Custom quotes", "/bespoke-quote"], ["Artwork advice", "/bespoke-quote"], ["Delivery support", "/all-products"]]} navigate={navigate} />
          <FooterCol title="Support" items={[["All products", "/all-products"], ["Cart", "/cart"], ["Contact", "/bespoke-quote"], ["Quote request", "/bespoke-quote"]]} navigate={navigate} />
        </div>
      </Shell>
    </footer>
  );
}

function FooterCol({ title, items, navigate }) {
  return (
    <div>
      <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.ink }}>{title}</div>
      <div className="grid gap-2">
        {items.map(([label, path]) => (
          <button key={label} onClick={() => navigate(path)} className="text-left text-[12px]" style={{ color: BRAND.muted }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`inline-flex items-center rounded-full px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_10px_22px_rgba(24,167,208,0.18)] transition hover:translate-y-[-1px] hover:shadow-[0_14px_26px_rgba(24,167,208,0.22)] ${className}`}
      style={{ backgroundColor: BRAND.primary }}
      {...props}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`inline-flex items-center rounded-full border px-5 py-2.5 text-[12px] font-bold transition hover:bg-[#F6F7F8] ${className}`}
      style={{ borderColor: BRAND.line, color: BRAND.ink, backgroundColor: "white" }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default function App() {
  const { path, navigate } = usePathState();
  const cart = useCart();

  let page;
  switch (path) {
    case "/standard-business-cards":
      page = <ProductPage type="businessCards" cart={cart} />;
      break;
    case "/flyers":
      page = <ProductPage type="flyers" cart={cart} />;
      break;
    case "/posters-large-format-prints":
      page = <ProductPage type="posters" cart={cart} />;
      break;
    case "/booklets":
      page = <BookletsPage navigate={navigate} />;
      break;
    case "/all-products":
      page = <AllProductsPage navigate={navigate} />;
      break;
    case "/bespoke-quote":
      page = <BespokeQuotePage />;
      break;
    case "/cart":
      page = <CartPage cart={cart} navigate={navigate} />;
      break;
    default:
      page = <HomePage navigate={navigate} />;
  }

  return (
    <div style={{ backgroundColor: BRAND.bg, color: BRAND.ink }}>
      <UtilityBar />
      <Header navigate={navigate} currentPath={path} cartCount={cart.items.length} cartSubtotal={cart.subtotal} />
      {page}
      <Footer navigate={navigate} />
    </div>
  );
}
