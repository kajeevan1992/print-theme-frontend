
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BRAND = {
  bg: "#F6F7F8",
  soft: "#FBFBFB",
  line: "#E6E7E9",
  panel: "#FFFFFF",
  ink: "#151718",
  muted: "#6B7277",
  primary: "#18A7D0",
  primaryDark: "#0F7FA0",
  blackBar: "#111214",
};

const heroSlides = [
  {
    title: "Professional online printing for modern brands.",
    body:
      "A cleaner storefront direction inspired by the reference screenshots — lighter typography, stronger hierarchy and commerce-focused spacing.",
    image: "/images/hero-slide-1.svg",
  },
  {
    title: "Make product browsing, quoting and ordering feel effortless.",
    body:
      "Designed for a polished client demo now, then ready to connect to your admin dashboard and API later.",
    image: "/images/hero-slide-2.svg",
  },
  {
    title: "A calm, premium theme for print products and custom quotes.",
    body:
      "Built with tighter scaling, better navigation, cleaner cards and proper image-first sections instead of fake mockup content.",
    image: "/images/hero-slide-3.svg",
  },
];

const catalog = {
  businessCards: {
    name: "Classic Business Cards",
    slug: "/standard-business-cards",
    basePrice: 21.99,
    images: ["/images/business-card-front.svg", "/images/business-card-back.svg", "/images/business-card-front.svg"],
    options: {
      finish: ["Standard Matte", "Premium Gloss", "Soft Touch", "Recycled"],
      orientation: ["Landscape", "Portrait"],
      corners: ["Square", "Rounded"],
      quantity: [100, 250, 500, 1000, 2500],
    },
    specs: [
      ["Size", "85mm × 55mm"],
      ["Material", "350gsm cardstock"],
      ["Print", "Full colour"],
      ["Delivery", "Standard / Express"],
    ],
  },
  flyers: {
    name: "Flyers",
    slug: "/flyers",
    basePrice: 18.40,
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
      ["Turnaround", "Fast production available"],
      ["Use case", "Promotions, menus, events"],
    ],
  },
  posters: {
    name: "Posters & Large Format",
    slug: "/posters-large-format-prints",
    basePrice: 8.49,
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
      ["Extras", "Lamination, custom sizes"],
    ],
  },
};

const megaMenu = [
  {
    title: "Popular products",
    items: [
      ["Business Cards", "/standard-business-cards"],
      ["Flyers", "/flyers"],
      ["Posters", "/posters-large-format-prints"],
      ["Booklets", "/booklets"],
    ],
  },
  {
    title: "Marketing materials",
    items: [
      ["Leaflets", "/flyers"],
      ["Brochures", "/booklets"],
      ["Menus", "/flyers"],
      ["Presentation Folders", "/bespoke-quote"],
    ],
  },
  {
    title: "Display & signage",
    items: [
      ["Roller Banners", "/bespoke-quote"],
      ["Window Graphics", "/bespoke-quote"],
      ["Outdoor Posters", "/posters-large-format-prints"],
      ["Custom Signage", "/bespoke-quote"],
    ],
  },
];

const recommendationCards = [
  { title: "Standard Flyers", price: "£18.40", image: "/images/flyer-front.svg" },
  { title: "Business Cards", price: "£21.99", image: "/images/business-card-front.svg" },
  { title: "Large Posters", price: "£8.49", image: "/images/poster-main.svg" },
  { title: "Booklets", price: "From £34.00", image: "/images/hero-slide-2.svg" },
];

const trustPoints = [
  "Professional print quality",
  "Fast production options",
  "Straightforward ordering flow",
  "Quote-ready for custom jobs",
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

  const addItem = (item) =>
    setItems((prev) => [...prev, { ...item, id: crypto.randomUUID(), qty: item.qty || 1 }]);
  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const updateQty = (id, delta) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x)));
  const clear = () => setItems([]);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { items, addItem, removeItem, updateQty, clear, subtotal };
}

function Shell({ children, narrow = false }) {
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${narrow ? "max-w-[1200px]" : "max-w-[1280px]"}`}>
      {children}
    </div>
  );
}

function UtilityBar() {
  return (
    <div style={{ backgroundColor: BRAND.blackBar, color: "white" }}>
      <Shell>
        <div className="flex h-8 items-center justify-between text-[11px] font-medium">
          <span>Online printing made easy</span>
          <div className="hidden gap-4 sm:flex">
            <span>Business orders</span>
            <span>Custom quotes</span>
            <span>Fast turnaround</span>
          </div>
        </div>
      </Shell>
    </div>
  );
}

function Header({ navigate, currentPath, cartCount, cartSubtotal }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setMegaOpen(false);
    };
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    document.addEventListener("mousedown", close);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      document.removeEventListener("mousedown", close);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navItems = [
    ["Business Cards", "/standard-business-cards"],
    ["Flyers", "/flyers"],
    ["Posters", "/posters-large-format-prints"],
    ["Booklets", "/booklets"],
    ["All Products", "/all-products", true], ["Stationery","/all-products"], ["Signage","/all-products"], ["Labels","/all-products"],
    ["Bespoke Quote", "/bespoke-quote"],
  ];

  return (
    <header className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-all duration-300 ${isScrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)]" : ""}`} style={{ borderColor: BRAND.line }}>
      <Shell>
        <div className="flex h-[66px] items-center justify-between gap-4">
          <button className="rounded-xl p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>

          <button onClick={() => navigate("/")} className="flex items-center gap-0.5">
            <span className="text-[34px] font-black tracking-[-0.04em]" style={{ color: "#18A7D0" }}>
              holo
            </span>
            <span className="text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
              print
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, path, hasMega]) =>
              hasMega ? (
                <div
                  key={path}
                  className="relative"
                  ref={ref}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    className="text-[12.5px] font-semibold"
                    style={{ color: currentPath === path ? BRAND.primary : BRAND.ink }}
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </button>
                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-9 w-[760px] -translate-x-1/2 rounded-[16px] border bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.08)]"
                        style={{ borderColor: BRAND.line }}
                      >
                        <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-4">
                          <div className="rounded-[16px] border p-4" style={{ borderColor: BRAND.line, backgroundColor: "#FBFBFB" }}>
                            <div className="overflow-hidden rounded-[12px] border" style={{ borderColor: BRAND.line }}>
                              <img src="/images/hero-slide-1.svg" alt="Promo" className="h-28 w-full object-cover" />
                            </div>
                            <div className="mt-4 text-[16px] font-bold leading-6" style={{ color: BRAND.ink }}>
                              Discover premium print products.
                            </div>
                            <p className="mt-2 text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
                              A compact, professional dropdown structure inspired by the screenshots you shared.
                            </p>
                          </div>

                          {megaMenu.map((group) => (
                            <div key={group.title}>
                              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>
                                {group.title}
                              </div>
                              <div className="grid gap-2">
                                {group.items.map(([label2, path2]) => (
                                  <button
                                    key={label2}
                                    onClick={() => {
                                      navigate(path2);
                                      setMegaOpen(false);
                                    }}
                                    className="rounded-xl px-3 py-2 text-left text-[12.5px] font-medium hover:bg-[#F6F7F8]"
                                    style={{ color: BRAND.ink }}
                                  >
                                    {label2}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={path}
                  className="text-[12.5px] font-semibold"
                  style={{ color: currentPath === path ? BRAND.primary : BRAND.ink }}
                  onClick={() => navigate(path)}
                >
                  {label}
                </button>
              )
            )}
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
      </Shell>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/25 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="h-full w-[320px] bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="text-[24px] font-black">Menu</div>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-2">
              {navItems.map(([label, path]) => (
                <button
                  key={path}
                  className="rounded-xl px-3 py-3 text-left text-[12.5px] font-semibold hover:bg-[#F6F7F8]"
                  onClick={() => {
                    navigate(path);
                    setMobileOpen(false);
                  }}
                >
                  {label}
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
  return (
    <div className="grid h-9 w-9 place-items-center rounded-xl border bg-white" style={{ borderColor: BRAND.line }}>
      {icon}
    </div>
  );
}

function Hero({ navigate }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % heroSlides.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b bg-white" style={{ borderColor: BRAND.line }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(17,163,68,0.06),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(24,167,208,0.05),transparent_28%)]" />
      <Shell>
        <div className="grid min-h-[380px] items-center gap-10 py-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-3 inline-flex rounded-full bg-[#F5F8F6] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: BRAND.primary }}>
                Clean professional storefront theme
              </div>
              <h1 className="max-w-[640px] text-[44px] font-black leading-[0.98] tracking-[-0.045em] sm:text-[52px]" style={{ color: BRAND.ink }}>
                {heroSlides[active].title}
              </h1>
              <p className="mt-5 max-w-[620px] text-[15px] leading-7" style={{ color: BRAND.muted }}>
                {heroSlides[active].body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => navigate("/all-products")}>Browse Products</PrimaryButton>
                <SecondaryButton onClick={() => navigate("/bespoke-quote")}>Request Bespoke Quote</SecondaryButton>
              </div>
              <div className="mt-5 flex gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-2.5 rounded-full"
                    style={{ width: i === active ? 26 : 8, backgroundColor: i === active ? BRAND.primary : "#D7DBDE" }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="justify-self-center lg:justify-self-end">
            <div className="overflow-hidden rounded-[20px] border bg-[#F8F9FA] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.05)]" style={{ borderColor: BRAND.line }}>
              <img src={heroSlides[active].image} alt="Hero" className="h-[240px] w-[420px] max-w-full rounded-[14px] object-cover" />
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function HomePage({ navigate, cart }) {
  return (
    <div>
      <Hero navigate={navigate} />

      {/* FEATURED STRIP */}
      <section className="py-6">
        <Shell>
          <div className="flex gap-3 overflow-x-auto">
            {["Business Cards","Flyers","Posters","Banners","Labels","Stationery"].map(x=>(
              <div key={x} className="min-w-[180px] rounded-[14px] border bg-white p-3 text-[13px] font-semibold">
                {x}
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* TRUST BADGES */}
      <section className="py-6">
        <Shell>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Fast delivery","Premium quality","UK printing","Bulk discounts"].map(x=>(
              <div key={x} className="rounded-[14px] border bg-white p-4 text-center text-[13px] font-semibold">
                {x}
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-6">
        <Shell>
          <div className="mb-4 text-[20px] font-bold">Featured Products</div>
          <div className="grid gap-4 md:grid-cols-3">
            {[1,2,3].map(i=>(
              <div key={i} className="rounded-[14px] border bg-white p-3">
                <div className="h-40 bg-[#eef2f4] rounded-[10px]" />
                <div className="mt-3 text-[14px] font-bold">Product {i}</div>
                <div className="text-[12px] text-gray-500">From £12.00</div>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-6">
        <Shell>
          <div className="grid gap-4 md:grid-cols-3 text-center">
            {["Choose product","Upload design","Receive delivery"].map(x=>(
              <div key={x} className="rounded-[14px] border bg-white p-4 text-[13px] font-semibold">
                {x}
              </div>
            ))}
          </div>
        </Shell>
      </section>


      <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35 }} className="py-7">
        <Shell>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Object.values(catalog).map((item) => (
              <button
                key={item.slug}
                onClick={() => navigate(item.slug)}
                className="card-hover group rounded-[16px] border bg-white p-4 text-left transition hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)]"
                style={{ borderColor: BRAND.line }}
              >
                <img src={item.images[0]} alt={item.name} className="h-32 w-full rounded-[14px] object-cover transition duration-500 group-hover:scale-[1.04]" />
                <div className="mt-4 text-[18px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>
                  {item.name}
                </div>
                <p className="mt-2 text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
                  Clean category card with a lighter, more commerce-focused layout.
                </p>
                <div className="mt-4 inline-flex items-center text-[12.5px] font-bold" style={{ color: BRAND.primary }}>
                  View product <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </button>
            ))}
          </div>
        </Shell>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: 0.04 }} className="py-6">
        <Shell>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <CardBox title="Why this direction feels more professional">
              <div className="grid gap-3">
                {[
                  "Smaller text and controls for a less zoomed-in feel.",
                  "Cleaner white cards, reduced visual clutter and calmer spacing.",
                  "Image-first sections instead of heavy fake mockup content.",
                  "A more believable print ecommerce structure for demos and client presentations.",
                ].map((x) => (
                  <div key={x} className="flex items-start gap-3">
                    <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-[#EAF8EF]" style={{ color: BRAND.primary }}>
                      <Check className="h-3 w-3" />
                    </div>
                    <p className="text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
                      {x}
                    </p>
                  </div>
                ))}
              </div>
            </CardBox>

            <CardBox title="Recommended products">
              <div className="grid grid-cols-2 gap-3">
                {recommendationCards.map((item) => (
                  <div key={item.title} className="card-hover rounded-[14px] border p-3 transition hover:shadow-[0_12px_28px_rgba(0,0,0,0.05)]" style={{ borderColor: BRAND.line }}>
                    <img src={item.image} alt={item.title} className="h-24 w-full rounded-[10px] object-cover" />
                    <div className="mt-3 text-[12.5px] font-bold" style={{ color: BRAND.ink }}>{item.title}</div>
                    <div className="mt-1 text-[12px]" style={{ color: BRAND.muted }}>{item.price}</div>
                  </div>
                ))}
              </div>
            </CardBox>
          </div>
        </Shell>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.35, delay: 0.04 }} className="py-6">
        <Shell>
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[16px] border bg-[#0F9E41]" style={{ borderColor: "#0F9E41" }}>
              <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">Dedicated team of print experts</div>
                  <div className="mt-3 max-w-[360px] text-[38px] font-black leading-[1.06] tracking-[-0.03em]">
                    Cleaner presentation. Stronger confidence. Better demo flow.
                  </div>
                  <p className="mt-3 max-w-[360px] text-[12.5px] leading-6 text-white/85">
                    This section mirrors the calm, professional tone in the reference screenshots without feeling oversized.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {trustPoints.map((x) => (
                      <div key={x} className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium">
                        {x}
                      </div>
                    ))}
                  </div>
                </div>
                <img src="/images/hero-slide-2.svg" alt="Trust" className="h-full min-h-[260px] w-full object-cover" />
              </div>
            </div>

            <div className="grid gap-4">
              {[
                ["4.8/5 rated service", "Trusted print storefront feel with cleaner spacing and hierarchy."],
                ["Fast quote handling", "Bespoke quote area now sits naturally within the storefront."],
                ["Professional UI scaling", "Smaller typography and denser cards create a more premium look."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
                  <div className="flex items-center gap-1" style={{ color: BRAND.primary }}>
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div className="mt-3 text-[16px] font-bold" style={{ color: BRAND.ink }}>{title}</div>
                  <p className="mt-2 text-[12.5px] leading-6" style={{ color: BRAND.muted }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </motion.section>
    </div>
  );
}

function CardBox({ title, children }) {
  return (
    <div className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
      <div className="mb-4 text-[38px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ProductPage({ type, cart }) {
  const product = catalog[type];
  const optionKeys = Object.keys(product.options);
  const defaultOptions = {};
  optionKeys.forEach((key) => (defaultOptions[key] = product.options[key][0]));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selected, setSelected] = useState(defaultOptions);

  const price = useMemo(() => {
    let result = product.basePrice;
    const quantityKey = selected.quantity;
    if (typeof quantityKey === "number") result += quantityKey > 250 ? 4.5 : quantityKey > 100 ? 2 : 0;
    return Number(result.toFixed(2));
  }, [selected, product]);

  return (
    <section className="py-6">
      <Shell narrow>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_360px]">
          <div className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
            <div className="mb-5 border-b pb-4" style={{ borderColor: BRAND.line }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>
                Product details
              </div>
              <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
                {product.name}
              </h1>
              <p className="mt-2 max-w-[620px] text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
                A cleaner product page layout inspired by the screenshots: stronger image area, lighter controls and a simpler purchase column.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="overflow-hidden rounded-[16px] border bg-[#FAFBFC]" style={{ borderColor: BRAND.line }}>
                  <img src={product.images[selectedImage]} alt={product.name} className="h-[340px] w-full object-cover" />
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

              <div className="grid gap-4">
                {optionKeys.map((key) => (
                  <div key={key}>
                    <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.ink }}>
                      {key}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.options[key].map((value) => {
                        const active = selected[key] === value;
                        return (
                          <button
                            key={String(value)}
                            onClick={() => setSelected((prev) => ({ ...prev, [key]: value }))}
                            className="rounded-full border px-4 py-2 text-[12.5px] font-semibold transition hover:-translate-y-[1px]"
                            style={{
                              borderColor: active ? BRAND.primary : BRAND.line,
                              backgroundColor: active ? "#F0FAF3" : "white",
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
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.ink }}>
                    Technical specs
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {product.specs.map(([k, v]) => (
                      <div key={k} className="rounded-[12px] border bg-white px-3 py-2.5" style={{ borderColor: BRAND.line }}>
                        <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.muted }}>{k}</div>
                        <div className="mt-1 text-[12.5px] font-semibold" style={{ color: BRAND.ink }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-[16px] border bg-white p-5 shadow-[0_10px_34px_rgba(0,0,0,0.04)]" style={{ borderColor: BRAND.line }}>
              <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>
                Price summary
              </div>
              <div className="mt-2 text-[38px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
                {currency(price)}
              </div>
              <div className="mt-1 text-[12px]" style={{ color: BRAND.muted }}>Starting price, excluding final delivery logic</div>

              <PrimaryButton
                className="mt-5 w-full justify-center"
                onClick={() =>
                  cart.addItem({
                    name: product.name,
                    config: selected,
                    price,
                  })
                }
              >
                Add to cart
              </PrimaryButton>

              <div className="mt-5 border-t pt-5" style={{ borderColor: BRAND.line }}>
                <div className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.ink }}>
                  What you get
                </div>
                <div className="mt-3 grid gap-2">
                  {["Clean product flow", "Image gallery layout", "Ready for real assets", "Easy API upgrade later"].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-[12.5px]" style={{ color: BRAND.muted }}>
                      <Check className="h-4 w-4" style={{ color: BRAND.primary }} />
                      {x}
                    </div>
                  ))}
                </div>
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
        <div className="rounded-[16px] border bg-white p-6" style={{ borderColor: BRAND.line }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>
            Discover our booklets
          </div>
          <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
            Booklet printing with a cleaner, more editorial layout.
          </h1>
          <p className="mt-3 max-w-[660px] text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
            This page has been simplified to feel more professional: lighter cards, clearer typography and image-first sections.
          </p>
          <div className="mt-5 flex gap-3">
            <PrimaryButton onClick={() => navigate("/all-products")}>Browse all products</PrimaryButton>
            <SecondaryButton onClick={() => navigate("/bespoke-quote")}>Request custom quote</SecondaryButton>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {["Stapled Booklets", "Wiro Bound Booklets", "Perfect Bound Booklets", "Spot UV Booklets", "Notebooks"].map((title, i) => (
            <div key={title} className="rounded-[16px] border bg-white p-4" style={{ borderColor: BRAND.line }}>
              <img src={heroSlides[i % heroSlides.length].image} alt={title} className="h-40 w-full rounded-[14px] object-cover" />
              <div className="mt-4 text-[18px] font-bold" style={{ color: BRAND.ink }}>{title}</div>
              <p className="mt-2 text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
                Compact product card spacing and a more believable print-store presentation.
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
          <div className="rounded-[16px] border bg-white p-4" style={{ borderColor: BRAND.line }}>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>Search catalog</div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: BRAND.muted }} />
              <Input className="h-10 rounded-xl border pl-10 text-[12.5px]" placeholder="Search products..." style={{ borderColor: BRAND.line }} />
            </div>
            <div className="mt-4 grid gap-1">
              {["Business Cards", "Flyers", "Posters", "Booklets", "Signage", "Stationery"].map((x) => (
                <button key={x} className="rounded-xl px-3 py-2 text-left text-[12.5px] font-medium hover:bg-[#F6F7F8]">
                  {x}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {megaMenu.map((group) => (
              <div key={group.title} className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
                <div className="text-[22px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>{group.title}</div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {group.items.map(([label, path], i) => (
                    <button
                      key={label}
                      onClick={() => navigate(path)}
                      className="card-hover rounded-[14px] border p-3 text-left transition hover:shadow-[0_14px_26px_rgba(0,0,0,0.05)]"
                      style={{ borderColor: BRAND.line }}
                    >
                      <img src={recommendationCards[i % recommendationCards.length].image} alt={label} className="h-24 w-full rounded-[10px] object-cover" />
                      <div className="mt-3 text-[12.5px] font-bold" style={{ color: BRAND.ink }}>{label}</div>
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
        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="rounded-[16px] border bg-white p-6" style={{ borderColor: BRAND.line }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>Get a custom quote</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>
              Send your project details for a bespoke print quote.
            </h1>
            <p className="mt-3 max-w-[620px] text-[12.5px] leading-6" style={{ color: BRAND.muted }}>
              This form is intentionally cleaner and more structured like the screenshots: smaller controls, tidy spacing and strong section hierarchy.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input placeholder="Full name" className="h-11 rounded-xl border text-[12.5px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Company" className="h-11 rounded-xl border text-[12.5px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Email" className="h-11 rounded-xl border text-[12.5px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Phone" className="h-11 rounded-xl border text-[12.5px]" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Project type" className="h-11 rounded-xl border text-[12.5px] sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <Textarea placeholder="Tell us about quantity, sizes, material, deadline and any finishing details." className="min-h-[170px] rounded-[14px] border text-[12.5px] sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <PrimaryButton className="sm:col-span-2 justify-center">Get quote</PrimaryButton>
            </div>
          </div>

          <div className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
            <div className="text-[16px] font-bold" style={{ color: BRAND.ink }}>Why use the quote form?</div>
            <div className="mt-4 grid gap-3">
              {["Custom sizes", "Special finishes", "Complex jobs", "Bulk orders"].map((x) => (
                <div key={x} className="flex items-center gap-2 text-[12.5px]" style={{ color: BRAND.muted }}>
                  <Check className="h-4 w-4" style={{ color: BRAND.primary }} />
                  {x}
                </div>
              ))}
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
            <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: BRAND.primary }}>Your basket</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>Cart</h1>
          </div>
          <SecondaryButton onClick={() => navigate("/all-products")}>Keep shopping</SecondaryButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4">
            {cart.items.length === 0 ? (
              <div className="rounded-[16px] border bg-white p-6 text-[12.5px]" style={{ borderColor: BRAND.line, color: BRAND.muted }}>
                Your cart is empty.
              </div>
            ) : (
              cart.items.map((item) => (
                <div key={item.id} className="rounded-[16px] border bg-white p-4" style={{ borderColor: BRAND.line }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-bold" style={{ color: BRAND.ink }}>{item.name}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(item.config || {}).map(([k, v]) => (
                          <span key={k} className="rounded-full bg-[#F6F7F8] px-3 py-1 text-[11px] font-medium" style={{ color: BRAND.muted }}>
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
                      <span className="w-5 text-center text-[12.5px] font-semibold">{item.qty}</span>
                      <button onClick={() => cart.updateQty(item.id, 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <button onClick={() => cart.removeItem(item.id)} className="text-[12px] font-bold" style={{ color: "#C23636" }}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="rounded-[16px] border bg-white p-5" style={{ borderColor: BRAND.line }}>
            <div className="text-[18px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>Order summary</div>
            <div className="mt-4 space-y-3 text-[12.5px]" style={{ color: BRAND.muted }}>
              <div className="flex justify-between"><span>Subtotal</span><span>{currency(cart.subtotal)}</span></div>
              <div className="flex justify-between"><span>Estimated VAT</span><span>{currency(cart.subtotal * 0.2)}</span></div>
            </div>
            <div className="mt-4 border-t pt-4" style={{ borderColor: BRAND.line }}>
              <div className="flex justify-between text-[16px] font-bold" style={{ color: BRAND.ink }}>
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
          <div className="flex flex-col items-center justify-between gap-2 text-[12px] font-semibold text-white sm:flex-row">
            <span>Get the very best print solutions for your business.</span>
            <div className="flex gap-2">
              <Input className="h-9 w-[240px] rounded-full border-0 bg-white text-[12px] text-black" placeholder="Email address" />
              <button className="rounded-full bg-black px-4 text-[12px] font-bold text-white">Subscribe</button>
            </div>
          </div>
        </Shell>
      </div>

      <Shell>
        <div className="grid gap-8 py-6 md:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <button onClick={() => navigate("/")} className="flex items-center gap-0.5">
              <span className="text-[38px] font-black tracking-[-0.04em]" style={{ color: "#18A7D0" }}>holo</span>
              <span className="text-[38px] font-black tracking-[-0.04em]" style={{ color: BRAND.ink }}>print</span>
            </button>
            <p className="mt-4 max-w-[360px] text-[12.5px] leading-7" style={{ color: BRAND.muted }}>
              A cleaner and more professional storefront direction inspired by the visual references you shared.
            </p>
          </div>

          <FooterCol title="Products" items={[["Business Cards", "/standard-business-cards"], ["Flyers", "/flyers"], ["Posters", "/posters-large-format-prints"], ["Booklets", "/booklets"]]} navigate={navigate} />
          <FooterCol title="Company" items={[["About Us", "/"], ["Contact", "/bespoke-quote"], ["Custom Quotes", "/bespoke-quote"], ["Cart", "/cart"]]} navigate={navigate} />
          <FooterCol title="Support" items={[["Help centre", "/all-products"], ["Delivery", "/all-products"], ["Artwork tips", "/all-products"], ["Terms", "/"]]} navigate={navigate} />
        </div>
      </Shell>
    </footer>
  );
}

function FooterCol({ title, items, navigate }) {
  return (
    <div>
      <div className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.ink }}>{title}</div>
      <div className="grid gap-2">
        {items.map(([label, path]) => (
          <button key={label} onClick={() => navigate(path)} className="text-left text-[12.5px]" style={{ color: BRAND.muted }}>
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
      className={`inline-flex items-center rounded-full px-4 py-2 text-[12.5px] font-bold text-white shadow-[0_10px_22px_rgba(17,163,68,0.18)] transition duration-200 hover:translate-y-[-1px] hover:shadow-[0_14px_26px_rgba(17,163,68,0.24)] active:translate-y-0 ${className}`}
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
      className={`inline-flex items-center rounded-full border px-4 py-2 text-[12.5px] font-bold transition duration-200 hover:bg-[#F6F7F8] hover:-translate-y-[1px] ${className}`}
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
      page = <HomePage navigate={navigate} cart={cart} />;
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
