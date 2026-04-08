import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MapPin, User, Search, ChevronRight, ChevronLeft, Plus, Minus, Check, Menu, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BRAND = {
  bg: "#EAF6F7",
  panel: "#F4FBFB",
  card: "#FFFFFF",
  line: "#C6E9EE",
  primary: "#24B4C7",
  primaryDark: "#138FA1",
  ink: "#0E3340",
  muted: "#597A84",
  soft: "#DDF3F6",
};

const heroSlides = [
  {
    titleA: "Transforming",
    titleB: "Vision",
    titleC: "into Print",
    body:
      "A modern print storefront for business cards, flyers, posters, booklets and bespoke quote requests — built for speed, clarity and future API integration.",
    cta: "Explore Our Solutions",
    visual: "ROLLER BANNERS",
  },
  {
    titleA: "Premium",
    titleB: "Print",
    titleC: "for Growing Brands",
    body:
      "Clean product configurators, clear pricing blocks and a polished quote flow that feels premium on every screen size.",
    cta: "Browse Products",
    visual: "BUSINESS CARDS",
  },
  {
    titleA: "Fast",
    titleB: "Turnaround",
    titleC: "Beautiful UX",
    body:
      "Launch with a strong storefront now, then connect products, stock, orders and customer accounts to your admin dashboard later.",
    cta: "Request Bespoke Quote",
    visual: "SAME DAY PRINT",
  },
];

const catalog = {
  businessCards: {
    name: "Business Cards",
    slug: "/standard-business-cards",
    priceBase: 78,
    imageLabel: "Need Some Inspiration?",
    specs: {
      size: "85mm × 55mm",
      printedSides: ["Single Sided", "Double Sided"],
      paperType: ["White Silk Paper", "Matt Uncoated"],
      lamination: ["None", "Soft Touch", "Matt", "Gloss"],
      quantity: [50, 100, 150, 200, 250, 300],
      vat: "20%",
      printing: "Colour / BW",
    },
  },
  flyers: {
    name: "Flyers",
    slug: "/flyers",
    priceBase: 65,
    imageLabel: "DIM SUM MENU",
    specs: {
      size: ["A4 (210mm × 297mm)", "A5 (148mm × 210mm)", "A6 (148mm × 210mm)"],
      printedSides: ["Single Sided", "Double Sided"],
      paperType: ["100gsm White Silk"],
      quantity: [50, 100, 150, 200],
      vat: "0% (No VAT)",
      printing: "Colour / BW",
    },
  },
  posters: {
    name: "Posters",
    slug: "/posters-large-format-prints",
    priceBase: 54,
    imageLabel: "FASHION WEEK",
    specs: {
      material: [
        "190gsm Photo Satin / 180gsm Matt Paper",
        "130gsm Matt Paper",
        "90gsm Plain Paper",
        "Vinyl Sticker Material",
        "PVC Material",
      ],
      size: ["A2", "A1", "A0", "Oversize (<1m × 1.5m)", "Oversize (>1m × 1.5m)"],
      eyelets: ["No", "Yes"],
      quantity: [1, 3, 6, 10, 15, 20],
      vat: "20%",
      printing: "Colour / BW",
    },
  },
};

const bookletCards = [
  { title: "Stapled Booklets", text: "A tidy premium booklet option available in multiple sizes and paper weights." },
  { title: "Wiro Bound Booklets", text: "Practical and polished for guides, manuals and presentation packs." },
  { title: "Perfect Bound Booklets", text: "Ideal for premium brochures, lookbooks and polished publications." },
  { title: "Spot UV Stapled Booklets", text: "Add tactile contrast and gloss details for standout branded print." },
  { title: "Notebooks", text: "Custom branded notebooks ready for campaigns, teams and events." },
];

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function priceForConfig(productKey, config) {
  const base = catalog[productKey].priceBase;
  let total = base;

  if (config.printedSides === "Double Sided") total += 12;
  if (config.lamination && config.lamination !== "None") total += 10;
  if (config.paperType === "Matt Uncoated") total += 5;
  if (config.eyelets === "Yes") total += 25;
  if (config.size?.includes("Oversize")) total += 35;
  if (config.material?.includes("PVC")) total += 24;
  if (config.material?.includes("Vinyl")) total += 16;

  const quantity = Number(config.quantity || 1);
  const multiplier = productKey === "posters"
    ? Math.max(1, quantity * 0.18)
    : Math.max(1, quantity / 100);

  return Math.round(total * multiplier);
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

function useLocalCart() {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem("atlantis-cart");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("atlantis-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (item) => setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }]);
  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const updateQty = (id, delta) => setItems((prev) => prev.map((x) => x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x));
  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  return { items, addItem, removeItem, updateQty, clear, subtotal };
}

function AppShell({ children }) {
  return (
    <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function Header({ navigate, cartCount, cartSubtotal, currentPath }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [
    { label: "Business Cards", path: "/standard-business-cards" },
    { label: "Flyers", path: "/flyers" },
    { label: "Posters", path: "/posters-large-format-prints" },
    { label: "Booklets", path: "/booklets" },
    { label: "All Products", path: "/all-products" },
    { label: "Bespoke Quote", path: "/bespoke-quote" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ backgroundColor: "rgba(234,246,247,0.94)", borderColor: BRAND.line }}>
      <AppShell>
        <div className="flex h-[84px] items-center justify-between gap-4">
          <div className="flex items-center gap-3 lg:hidden">
            <button className="rounded-2xl p-3" onClick={() => setMobileOpen(true)} style={{ backgroundColor: BRAND.panel }}>
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <Logo navigate={navigate} />

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-[18px] font-semibold transition hover:opacity-80"
                style={{ color: currentPath === item.path ? BRAND.primaryDark : BRAND.ink }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <IconBubble icon={<MapPin className="h-5 w-5" />} />
            <IconBubble icon={<User className="h-5 w-5" />} />
            <button
              onClick={() => navigate("/cart")}
              className="relative rounded-2xl p-3 transition hover:scale-[1.03]"
              style={{ backgroundColor: BRAND.panel, color: BRAND.ink }}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold text-white"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <div className="hidden rounded-2xl px-4 py-2.5 text-sm font-semibold lg:block" style={{ backgroundColor: BRAND.panel, color: BRAND.muted }}>
              {currency(cartSubtotal)}
            </div>
          </div>
        </div>
      </AppShell>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 z-50 h-full w-[320px] border-r p-6" style={{ backgroundColor: BRAND.card, borderColor: BRAND.line }}>
            <div className="flex items-center justify-between">
              <Logo navigate={(path) => { navigate(path); setMobileOpen(false); }} />
              <button onClick={() => setMobileOpen(false)} className="rounded-2xl p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 grid gap-2">
              {nav.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setMobileOpen(false); }}
                  className="rounded-2xl px-4 py-3 text-left text-base font-semibold transition hover:translate-x-1"
                  style={{ color: currentPath === item.path ? BRAND.primaryDark : BRAND.ink, backgroundColor: currentPath === item.path ? BRAND.soft : "transparent" }}
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

function Logo({ navigate }) {
  return (
    <button onClick={() => navigate("/")} className="group flex items-center gap-0.5">
      <span className="text-[40px] font-black tracking-tight" style={{ color: BRAND.primary }}>atlantis</span>
      <span className="text-[40px] font-black tracking-tight" style={{ color: BRAND.ink }}>print</span>
    </button>
  );
}

function IconBubble({ icon }) {
  return (
    <div className="rounded-2xl p-3" style={{ backgroundColor: BRAND.panel, color: BRAND.ink }}>
      {icon}
    </div>
  );
}

function Hero({ navigate }) {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden border-b" style={{ backgroundColor: BRAND.bg, borderColor: BRAND.line }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(36,180,199,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,58,70,0.14),transparent_30%)]" />
      <AppShell>
        <div className="relative grid min-h-[760px] grid-cols-1 gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <Badge className="mb-6 w-fit rounded-full border-0 px-4 py-2 text-xs uppercase tracking-[0.18em]" style={{ backgroundColor: BRAND.soft, color: BRAND.primaryDark }}>
              Premium online printing across the UK
            </Badge>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <h1 className="max-w-4xl text-5xl font-black leading-[0.93] tracking-[-0.03em] sm:text-6xl lg:text-[84px]" style={{ color: BRAND.ink }}>
                  {slide.titleA} <span style={{ color: BRAND.primary }}>{slide.titleB}</span> {slide.titleC}
                </h1>
                <p className="mt-8 max-w-2xl text-[18px] leading-8 sm:text-[20px]" style={{ color: BRAND.muted }}>
                  {slide.body}
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <PrimaryButton onClick={() => navigate("/all-products")}>
                    {slide.cta} <ChevronRight className="ml-2 h-5 w-5" />
                  </PrimaryButton>
                  <SecondaryButton onClick={() => navigate("/bespoke-quote")}>
                    Request Bespoke Quote
                  </SecondaryButton>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 flex items-center gap-3">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-3 rounded-full transition-all"
                  style={{ width: i === active ? 54 : 12, backgroundColor: i === active ? BRAND.primary : "rgba(14,58,70,0.2)" }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              key={active + "visual"}
              initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[580px] w-full max-w-[540px] rounded-[40px] border p-8 shadow-[0_30px_70px_rgba(14,58,70,0.18)]"
              style={{ background: "linear-gradient(180deg, rgba(14,58,70,0.15), rgba(255,255,255,0.78))", borderColor: BRAND.line }}
            >
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-black/90 shadow-2xl" />
              <div className="absolute left-8 top-10 h-10 w-32 rounded-full bg-black/80 shadow-2xl" />
              <div className="absolute bottom-10 left-1/2 h-7 w-44 -translate-x-1/2 rounded-t-md bg-slate-500/80" />
              <div
                className="absolute bottom-16 left-1/2 flex h-[420px] w-[220px] -translate-x-1/2 flex-col justify-between rounded-sm px-8 py-10 text-left shadow-[0_30px_50px_rgba(0,0,0,0.28)]"
                style={{ background: "linear-gradient(180deg, #006E79, #0E3A46)", color: "rgba(255,255,255,0.92)" }}
              >
                <div>
                  <div className="text-[52px] font-black tracking-tight">atlantis<span className="text-white/80">print</span></div>
                  <div className="mt-8 text-[34px] font-black uppercase leading-tight tracking-tight">{slide.visual}</div>
                </div>
                <div className="space-y-3 text-base uppercase text-white/70">
                  <div>High resolution printing</div>
                  <div>Vibrant brand colours</div>
                  <div>Durable premium materials</div>
                  <div>Fast delivery</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AppShell>
    </section>
  );
}

function HomePage({ navigate, addDemoProduct }) {
  return (
    <div>
      <Hero navigate={navigate} />
      <AppShell>
        <section className="py-20">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            <FeatureCard title="Business Cards" text="Premium cards with refined options for paper, lamination, sides and quantity." cta="Configure cards" onClick={() => navigate("/standard-business-cards")} />
            <FeatureCard title="Flyers" text="Simple, quick promotional print with a clean size and sides selector." cta="Explore flyers" onClick={() => navigate("/flyers")} />
            <FeatureCard title="Posters" text="Large format poster builder with materials, oversize options and eyelet add-ons." cta="View posters" onClick={() => navigate("/posters-large-format-prints")} />
            <FeatureCard title="Booklets" text="Range explorer for stapled, wiro, perfect bound and notebook formats." cta="Browse booklets" onClick={() => navigate("/booklets")} />
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="soft-card rounded-[32px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
              <CardHeader className="p-8 pb-2">
                <CardTitle className="text-[32px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>Why this starter is better for building fast</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 p-8 pt-4 text-base leading-7" style={{ color: BRAND.muted }}>
                <InfoBullet text="Frontend-first structure so you can deploy immediately in Coolify." />
                <InfoBullet text="Mock catalog and pricing engine ready to swap for admin/API data." />
                <InfoBullet text="Reusable theme tokens matching your current visual identity." />
                <InfoBullet text="Cleaner UX hierarchy, stronger spacing and more scalable component structure." />
                <div className="pt-3">
                  <PrimaryButton onClick={addDemoProduct}>
                    Add demo business card product
                  </PrimaryButton>
                </div>
              </CardContent>
            </Card>

            <Card className="soft-card rounded-[32px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.panel }}>
              <CardHeader className="p-8 pb-2">
                <CardTitle className="text-[32px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>API-ready architecture</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <div className="rounded-[28px] border p-5 font-mono text-sm leading-7" style={{ borderColor: BRAND.line, backgroundColor: "white", color: BRAND.ink }}>
                  <div>src/</div>
                  <div className="pl-4">components/</div>
                  <div className="pl-8">storefront/</div>
                  <div className="pl-4">features/</div>
                  <div className="pl-8">cart/</div>
                  <div className="pl-8">catalog/</div>
                  <div className="pl-8">quote/</div>
                  <div className="pl-4">services/</div>
                  <div className="pl-8">api.ts</div>
                  <div className="pl-8">pricing.ts</div>
                  <div className="pl-4">theme/</div>
                  <div className="pl-8">tokens.ts</div>
                </div>
                <p className="mt-5 text-base leading-7" style={{ color: BRAND.muted }}>
                  You can keep the whole storefront live and polished while gradually connecting products, pricing, stock, authentication, quotes and orders to your admin dashboard.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </AppShell>
    </div>
  );
}

function FeatureCard({ title, text, cta, onClick }) {
  return (
    <motion.div whileHover={{ y: -6 }}>
      <Card className="soft-card h-full rounded-[32px] border transition-all" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
        <CardContent className="flex h-full flex-col justify-between p-7">
          <div>
            <div className="mb-6 h-44 rounded-[28px] border" style={{ borderColor: BRAND.line, background: "linear-gradient(135deg, rgba(36,180,199,0.22), rgba(14,58,70,0.08))" }} />
            <h3 className="text-[28px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>{title}</h3>
            <p className="mt-3 text-base leading-7" style={{ color: BRAND.muted }}>{text}</p>
          </div>
          <button onClick={onClick} className="mt-7 inline-flex items-center justify-start rounded-full px-0 text-base font-bold transition hover:translate-x-1" style={{ color: BRAND.primaryDark }}>
            {cta} <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InfoBullet({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-full p-1.5" style={{ backgroundColor: BRAND.soft, color: BRAND.primaryDark }}>
        <Check className="h-4 w-4" />
      </div>
      <p>{text}</p>
    </div>
  );
}

function ProductConfigurator({ productKey, addItem }) {
  const product = catalog[productKey];
  const initial = useMemo(() => {
    const specs = product.specs;
    const seed = {};
    Object.entries(specs).forEach(([key, value]) => {
      if (Array.isArray(value)) seed[key] = value[0];
    });
    if (!seed.quantity && specs.quantity) seed.quantity = specs.quantity[0];
    return seed;
  }, [product]);

  const [config, setConfig] = useState(initial);
  const [qtyIndex, setQtyIndex] = useState(0);

  useEffect(() => {
    if (product.specs.quantity) {
      setConfig((prev) => ({ ...prev, quantity: product.specs.quantity[qtyIndex] }));
    }
  }, [qtyIndex, product.specs.quantity]);

  const price = priceForConfig(productKey, config);
  const net = Math.round(price / 1.2);
  const vatValue = price - net;

  const pick = (field, value) => setConfig((prev) => ({ ...prev, [field]: value }));

  const addToCart = () => {
    addItem({
      name: product.name,
      config,
      price,
      qty: 1,
    });
  };

  return (
    <AppShell>
      <section className="py-14">
        <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_440px]">
          <Card className="soft-card overflow-hidden rounded-[34px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
            <CardContent className="p-0">
              <div className="grid min-h-[740px] grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
                <div className="relative flex items-center justify-center border-b p-8 lg:border-b-0 lg:border-r" style={{ borderColor: BRAND.line, backgroundColor: "#F3F7F8" }}>
                  <button className="absolute left-5 top-1/2 rounded-full border p-3 -translate-y-1/2" style={{ borderColor: BRAND.line, backgroundColor: "rgba(255,255,255,0.8)" }}>
                    <ChevronLeft className="h-5 w-5" style={{ color: BRAND.ink }} />
                  </button>
                  <button className="absolute right-5 top-1/2 rounded-full border p-3 -translate-y-1/2" style={{ borderColor: BRAND.line, backgroundColor: "rgba(255,255,255,0.8)" }}>
                    <ChevronRight className="h-5 w-5" style={{ color: BRAND.ink }} />
                  </button>
                  <ProductVisual productKey={productKey} label={product.imageLabel} />
                  <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
                    {[0, 1, 2].map((dot) => (
                      <span key={dot} className="h-3 rounded-full" style={{ width: dot === 0 ? 30 : 10, backgroundColor: dot === 0 ? BRAND.primary : "rgba(14,58,70,0.18)" }} />
                    ))}
                  </div>
                </div>

                <div className="p-8 sm:p-10">
                  <h2 className="text-[42px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>{product.name}</h2>
                  <p className="mt-3 max-w-xl text-[17px] leading-8" style={{ color: BRAND.muted }}>
                    Clean storefront configurator with premium theme styling and expandable options for API-driven pricing later.
                  </p>

                  <div className="mt-8 space-y-8">
                    {Object.entries(product.specs).map(([field, values]) => {
                      if (!Array.isArray(values) || field === "quantity") return null;
                      return (
                        <OptionGroup
                          key={field}
                          title={toTitle(field)}
                          options={values}
                          selected={config[field]}
                          onPick={(value) => pick(field, value)}
                        />
                      );
                    })}

                    {product.specs.quantity && (
                      <div>
                        <div className="mb-3 text-xl font-bold" style={{ color: BRAND.ink }}>Quantity</div>
                        <input
                          type="range"
                          min={0}
                          max={product.specs.quantity.length - 1}
                          value={qtyIndex}
                          onChange={(e) => setQtyIndex(Number(e.target.value))}
                          className="h-3 w-full cursor-pointer appearance-none rounded-full"
                          style={{ background: `linear-gradient(90deg, ${BRAND.primary} 0%, ${BRAND.soft} 100%)` }}
                        />
                        <div className={`mt-4 grid gap-3 ${product.specs.quantity.length > 4 ? "grid-cols-4 sm:grid-cols-6" : "grid-cols-4"}`}>
                          {product.specs.quantity.map((qty, i) => (
                            <button key={qty} onClick={() => setQtyIndex(i)} className="text-left text-2xl font-semibold transition" style={{ color: i === qtyIndex ? BRAND.primaryDark : BRAND.primary }}>
                              {qty}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6 xl:sticky xl:top-[110px]">
            <Card className="soft-card rounded-[32px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-[28px] font-black tracking-[-0.02em]" style={{ color: BRAND.primaryDark }}>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-0 sm:grid-cols-2">
                {specList(product, config).map((item, i) => (
                  <div key={item.label} className={`border-b p-4 ${i % 2 === 1 ? "sm:border-l" : ""}`} style={{ borderColor: BRAND.line }}>
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: BRAND.primaryDark }}>{item.label}</div>
                    <div className="text-[22px] font-semibold leading-8" style={{ color: BRAND.ink }}>{item.value}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="soft-card rounded-[32px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.panel }}>
              <CardContent className="p-6">
                <div className="rounded-[24px] border border-dashed p-5" style={{ borderColor: BRAND.line, backgroundColor: "rgba(255,255,255,0.55)" }}>
                  <div className="text-[26px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>Can't find your exact specs?</div>
                  <p className="mt-2 text-base leading-7" style={{ color: BRAND.primaryDark }}>We offer custom sizes, premium papers and special finishes.</p>
                  <SecondaryButton className="mt-5">Request Bespoke Quote</SecondaryButton>
                </div>
              </CardContent>
            </Card>

            <Card className="soft-card rounded-[32px] border shadow-[0_20px_50px_rgba(36,180,199,0.12)]" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
              <CardContent className="p-8">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <div className="text-[64px] font-black leading-none tracking-[-0.03em]" style={{ color: BRAND.ink }}>{currency(price)}</div>
                    <div className="mt-2 text-[26px] font-semibold" style={{ color: BRAND.primaryDark }}>INC. VAT</div>
                    <div className="mt-3 text-base" style={{ color: BRAND.muted }}>Net: {currency(net)} + VAT: {currency(vatValue)}</div>
                  </div>
                </div>
                <PrimaryButton onClick={addToCart} className="mt-8 h-[78px] w-full justify-center text-[26px]">
                  <ShoppingCart className="mr-3 h-8 w-8" /> ADD TO CART
                </PrimaryButton>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function specList(product, config) {
  const fields = [];
  const specs = product.specs;
  if (specs.size) fields.push({ label: "Size", value: Array.isArray(specs.size) ? config.size || specs.size.join(", ") : specs.size });
  if (specs.paperType) fields.push({ label: "Paper Types", value: Array.isArray(specs.paperType) ? specs.paperType.join(", ") : specs.paperType });
  if (specs.printedSides) fields.push({ label: "Printed Sides", value: specs.printedSides.join(", ") });
  if (specs.lamination) fields.push({ label: "Lamination", value: specs.lamination.join(", ") });
  if (specs.material) fields.push({ label: "Materials", value: specs.material.join(", ") });
  if (specs.eyelets) fields.push({ label: "Available Add-ons", value: "Eyelets" });
  fields.push({ label: "Printing", value: specs.printing });
  fields.push({ label: "VAT", value: specs.vat });
  return fields;
}

function ProductVisual({ productKey, label }) {
  if (productKey === "flyers") {
    return (
      <div className="relative h-[500px] w-full max-w-[520px]">
        <div className="absolute left-6 top-16 h-[360px] w-[220px] rotate-[-10deg] rounded-[18px] p-6 shadow-2xl" style={{ background: "linear-gradient(180deg,#1A2433,#3F0E5C 34%,#27C5E6 100%)" }}>
          <div className="mt-6 text-6xl font-black italic leading-[0.9] text-white">DIM</div>
          <div className="text-6xl font-black italic leading-[0.9] text-cyan-100">SUM</div>
          <div className="absolute bottom-5 left-6 text-sm font-bold tracking-[0.35em] text-white/90">TAKEAWAY MENU</div>
        </div>
        <div className="absolute left-52 top-20 h-[360px] w-[220px] rotate-[8deg] rounded-[18px] p-6 shadow-2xl" style={{ background: "linear-gradient(180deg,#1A2433,#3F0E5C 34%,#27C5E6 100%)" }}>
          <div className="mt-6 text-6xl font-black italic leading-[0.9] text-white">DIM</div>
          <div className="text-6xl font-black italic leading-[0.9] text-cyan-100">SUM</div>
          <div className="absolute bottom-5 left-6 text-sm font-bold tracking-[0.35em] text-white/90">TAKEAWAY MENU</div>
        </div>
      </div>
    );
  }

  if (productKey === "posters") {
    return (
      <div className="relative h-[560px] w-[390px] rounded-[20px] p-6 shadow-2xl" style={{ backgroundColor: "#E5B500" }}>
        <div className="absolute left-12 top-20 h-32 w-32 rounded-full bg-black" />
        <div className="absolute left-40 top-12 h-20 w-20 rounded-full bg-yellow-400" />
        <div className="absolute right-10 top-4 h-24 w-24 rounded-full bg-black" />
        <div className="absolute inset-y-24 right-12 w-28 bg-cyan-200" />
        <div className="absolute left-10 top-56 text-[84px] font-black leading-[0.88] tracking-tight text-white">03–10</div>
        <div className="absolute left-10 top-[310px] text-[84px] font-black leading-[0.88] tracking-tight text-white">04/2020</div>
        <div className="absolute bottom-12 left-10 text-[92px] font-black leading-none tracking-tight text-white">FASHION</div>
        <div className="absolute bottom-4 left-28 text-[22px] font-bold tracking-[0.8em] text-white">WEEK</div>
      </div>
    );
  }

  return (
    <div className="relative h-[470px] w-full max-w-[560px]">
      <div className="absolute left-4 top-14 h-[300px] w-[210px] rotate-[-8deg] rounded-[20px] bg-white p-5 shadow-2xl">
        <div className="grid h-full grid-cols-[56px_1fr] gap-4">
          <div className="space-y-3 pt-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-7 w-7 rounded-full" style={{ backgroundColor: ["#E5855E", "#B0004B", "#7B9125", "#E2A61B", "#67C3B1", "#D79F7D", "#2BA7D0", "#A97839"][i] }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg border bg-slate-100" style={{ borderColor: BRAND.line }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-52 top-16 h-[230px] w-[300px] rounded-[20px] bg-white p-6 shadow-2xl">
        <div className="h-full rounded-[14px] p-5" style={{ background: "linear-gradient(135deg,#E85E7F,#F8D195 58%,#F6FBFF)" }}>
          <div className="mt-20 text-5xl font-black leading-none" style={{ color: BRAND.ink }}>Need Some</div>
          <div className="text-5xl font-black leading-none" style={{ color: BRAND.ink }}>Inspiration?</div>
        </div>
      </div>
      <div className="absolute bottom-2 left-36 text-sm font-bold tracking-[0.3em]" style={{ color: BRAND.muted }}>{label}</div>
    </div>
  );
}

function OptionGroup({ title, options, selected, onPick }) {
  return (
    <div>
      <div className="mb-3 text-xl font-bold" style={{ color: BRAND.ink }}>{title} *</div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const active = option === selected;
          return (
            <button
              key={option}
              onClick={() => onPick(option)}
              className="rounded-full border px-6 py-4 text-lg font-semibold transition hover:-translate-y-[1px]"
              style={{
                borderColor: active ? BRAND.primary : BRAND.line,
                backgroundColor: active ? BRAND.primary : "rgba(255,255,255,0.72)",
                color: active ? "white" : BRAND.ink,
                boxShadow: active ? "0 8px 20px rgba(36,180,199,0.25)" : "none"
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookletsPage({ navigate }) {
  return (
    <AppShell>
      <section className="py-14">
        <div className="rounded-[36px] border p-10" style={{ borderColor: BRAND.line, background: "linear-gradient(135deg, rgba(36,180,199,0.12), rgba(255,255,255,0.78))" }}>
          <Badge className="rounded-full border-0 px-4 py-2 tracking-[0.15em]" style={{ backgroundColor: BRAND.soft, color: BRAND.primaryDark }}>
            Booklet printing in London and the UK
          </Badge>
          <h1 className="mt-5 max-w-3xl text-[56px] font-black leading-[1.05] tracking-[-0.03em]" style={{ color: BRAND.ink }}>
            Get booklet printing with a clean premium storefront and the fastest path to launch.
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8" style={{ color: BRAND.muted }}>
            Select a booklet family below, then later connect page counts, sizes, paper weights, cover finishes and turnaround logic through your API.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryButton onClick={() => navigate("/all-products")}>Browse Solutions</PrimaryButton>
            <SecondaryButton onClick={() => navigate("/bespoke-quote")}>Request Custom Quote</SecondaryButton>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-[34px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>Explore our booklet range</h2>
          <p className="mt-3 text-lg" style={{ color: BRAND.muted }}>Choose from premium binding options. Select a product below to configure your sizes, page counts and turnaround later.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookletCards.map((item, i) => (
            <Card key={item.title} className="soft-card rounded-[30px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
              <CardContent className="p-4">
                <div className="h-52 rounded-[24px] border" style={{ borderColor: BRAND.line, background: i % 2 === 0 ? "linear-gradient(135deg, rgba(133,126,203,0.26), rgba(255,255,255,0.8))" : "linear-gradient(135deg, rgba(36,180,199,0.18), rgba(255,255,255,0.86))" }} />
                <div className="mt-5 text-[24px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>{item.title}</div>
                <p className="mt-2 text-base leading-7" style={{ color: BRAND.muted }}>{item.text}</p>
                <button className="mt-3 inline-flex items-center px-0 font-bold transition hover:translate-x-1" style={{ color: BRAND.primaryDark }}>Details <ChevronRight className="ml-1 h-4 w-4" /></button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="soft-card rounded-[32px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
            <CardHeader className="p-8 pb-2"><CardTitle className="text-[32px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>Competitive rates and rapid execution</CardTitle></CardHeader>
            <CardContent className="space-y-4 p-8 pt-4 text-base leading-7" style={{ color: BRAND.muted }}>
              <InfoBullet text="Perfect for premium brochures, manuals, presentations and company packs." />
              <InfoBullet text="Selectable page counts, paper weights and laminations can be injected from your admin API." />
              <InfoBullet text="Use the same storefront shell for notebooks, spot UV, stapled and wiro bound products." />
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {["Highest quality printing", "Graphic design expertise", "Fastest turnaround times", "Best value for money"].map((item) => (
              <Card key={item} className="soft-card rounded-[28px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.panel }}>
                <CardContent className="p-5">
                  <div className="font-black" style={{ color: BRAND.ink }}>{item}</div>
                  <p className="mt-2 text-sm leading-6" style={{ color: BRAND.muted }}>This section mirrors your current tone but uses cleaner spacing and clearer typographic hierarchy.</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function AllProductsPage({ navigate }) {
  const groups = [
    {
      title: "Marketing Materials",
      items: [
        ["Business Cards", "/standard-business-cards"],
        ["Flyers", "/flyers"],
        ["Booklets", "/booklets"],
        ["Posters", "/posters-large-format-prints"],
      ],
    },
    {
      title: "Signage & Displays",
      items: [["Posters & Large Format", "/posters-large-format-prints"], ["Roller Banners", "/bespoke-quote"], ["Signage & Display", "/bespoke-quote"]],
    },
    {
      title: "Stationery & More",
      items: [["Bespoke Quote", "/bespoke-quote"], ["Same Day Business Cards", "/standard-business-cards"], ["Same Day Flyers", "/flyers"]],
    },
  ];

  return (
    <AppShell>
      <section className="py-14">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <Card className="soft-card rounded-[34px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
            <CardContent className="p-6">
              <div className="mb-4 text-sm font-black uppercase tracking-[0.16em]" style={{ color: BRAND.primaryDark }}>Search catalog</div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: BRAND.muted }} />
                <Input placeholder="Search products..." className="h-14 rounded-full border pl-12 text-base" style={{ borderColor: BRAND.line, backgroundColor: "white" }} />
              </div>
              <Separator className="my-6 h-px" style={{ backgroundColor: BRAND.line }} />
              <div className="space-y-2">
                {["Business Cards", "Flyers", "Posters", "Booklets", "Same Day Printing", "Bespoke Products"].map((tag) => (
                  <div key={tag} className="rounded-full px-4 py-3 text-sm font-semibold" style={{ backgroundColor: BRAND.panel, color: BRAND.ink }}>{tag}</div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {groups.map((group) => (
              <Card key={group.title} className="soft-card rounded-[34px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
                <CardContent className="p-7">
                  <h2 className="text-[28px] font-black tracking-[-0.02em]" style={{ color: BRAND.ink }}>{group.title}</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map(([label, path], i) => (
                      <button key={label} onClick={() => navigate(path)} className="rounded-[28px] border p-5 text-left transition hover:-translate-y-1" style={{ borderColor: BRAND.line, background: i % 2 === 0 ? "linear-gradient(135deg, rgba(36,180,199,0.16), rgba(255,255,255,0.9))" : "linear-gradient(135deg, rgba(14,58,70,0.08), rgba(255,255,255,0.9))", boxShadow: "0 8px 20px rgba(14,58,70,0.05)" }}>
                        <div className="mb-4 h-28 rounded-[20px] border" style={{ borderColor: BRAND.line, backgroundColor: "rgba(255,255,255,0.65)" }} />
                        <div className="text-xl font-black" style={{ color: BRAND.ink }}>{label}</div>
                        <div className="mt-2 text-sm leading-6" style={{ color: BRAND.muted }}>Scalable storefront card ready for collection-driven data.</div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function BespokeQuotePage() {
  return (
    <AppShell>
      <section className="py-16">
        <div className="mx-auto max-w-4xl">
          <Card className="soft-card rounded-[36px] border shadow-[0_20px_50px_rgba(36,180,199,0.08)]" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
            <CardHeader className="p-8 pb-2">
              <CardTitle className="text-[42px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>Request a Bespoke Quote</CardTitle>
              <p className="pt-2 text-[18px] leading-8" style={{ color: BRAND.muted }}>
                This form is frontend-ready. Later connect it directly to your CRM, admin dashboard or quote API endpoint.
              </p>
            </CardHeader>
            <CardContent className="grid gap-4 p-8 sm:grid-cols-2">
              <Input placeholder="Full name *" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Job title" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Email *" className="h-14 rounded-2xl border sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Phone number" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Company" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Selected service / product" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Input placeholder="Preferred turnaround" className="h-14 rounded-2xl border" style={{ borderColor: BRAND.line }} />
              <Textarea placeholder="Please describe your printing requirements, quantity, sizes, material, finish and any special notes." className="min-h-[180px] rounded-[24px] border sm:col-span-2" style={{ borderColor: BRAND.line }} />
              <PrimaryButton className="mt-2 h-14 justify-center text-lg sm:col-span-2">
                Get a Quote
              </PrimaryButton>
              <p className="text-center text-sm sm:col-span-2" style={{ color: BRAND.muted }}>Prefer to talk? Call us on 0203 137 4310</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

function CartPage({ cart, navigate }) {
  return (
    <AppShell>
      <section className="py-14">
        <div className="mb-8 flex items-center justify-between gap-6">
          <div>
            <h1 className="text-[56px] font-black tracking-[-0.03em]" style={{ color: BRAND.ink }}>Cart</h1>
            <p className="mt-3 text-lg" style={{ color: BRAND.muted }}>Review your configured products before proceeding to order creation or checkout.</p>
          </div>
          <SecondaryButton onClick={() => navigate("/all-products")}>Keep Shopping</SecondaryButton>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            {cart.items.length === 0 ? (
              <Card className="soft-card rounded-[34px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
                <CardContent className="p-10 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ backgroundColor: BRAND.soft }}>
                    <ShoppingCart className="h-8 w-8" style={{ color: BRAND.primaryDark }} />
                  </div>
                  <div className="mt-5 text-3xl font-black" style={{ color: BRAND.ink }}>Your cart is empty</div>
                  <p className="mt-3 text-lg" style={{ color: BRAND.muted }}>Add a few products to see your order summary here.</p>
                </CardContent>
              </Card>
            ) : cart.items.map((item) => (
              <Card key={item.id} className="soft-card rounded-[30px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
                <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-2xl font-black" style={{ color: BRAND.ink }}>{item.name}</div>
                    <div className="mt-2 text-base" style={{ color: BRAND.primaryDark }}>Qty: {item.config.quantity}</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm" style={{ color: BRAND.muted }}>
                      {Object.entries(item.config).map(([key, val]) => (
                        <span key={key} className="rounded-full px-3 py-1.5" style={{ backgroundColor: BRAND.panel }}>{toTitle(key)}: {String(val)}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 rounded-full border px-3 py-2" style={{ borderColor: BRAND.line }}>
                      <button onClick={() => cart.updateQty(item.id, -1)}><Minus className="h-4 w-4" /></button>
                      <span className="w-6 text-center font-bold">{item.qty}</span>
                      <button onClick={() => cart.updateQty(item.id, 1)}><Plus className="h-4 w-4" /></button>
                    </div>
                    <div className="min-w-[110px] text-right text-2xl font-black" style={{ color: BRAND.ink }}>{currency(item.price * item.qty)}</div>
                    <button onClick={() => cart.removeItem(item.id)} className="rounded-full px-3 py-2 text-sm font-bold" style={{ color: "#E84E5F", backgroundColor: "rgba(232,78,95,0.08)" }}>Remove</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="soft-card h-fit rounded-[34px] border" style={{ borderColor: BRAND.line, backgroundColor: BRAND.card }}>
            <CardContent className="p-8">
              <div className="text-[32px] font-black" style={{ color: BRAND.ink }}>Order Summary</div>
              <div className="mt-6 space-y-3 text-base">
                <div className="flex items-center justify-between" style={{ color: BRAND.muted }}><span>Subtotal</span><span>{currency(cart.subtotal)}</span></div>
                <div className="flex items-center justify-between" style={{ color: BRAND.muted }}><span>Estimated VAT</span><span>{currency(Math.round(cart.subtotal / 6))}</span></div>
                <div className="flex items-center justify-between" style={{ color: BRAND.muted }}><span>Shipping</span><span>Calculated later</span></div>
              </div>
              <Separator className="my-6 h-px" style={{ backgroundColor: BRAND.line }} />
              <div className="flex items-center justify-between text-3xl font-black" style={{ color: BRAND.ink }}>
                <span>Total</span>
                <span>{currency(cart.subtotal)}</span>
              </div>
              <PrimaryButton className="mt-8 h-16 w-full justify-center text-xl">
                Proceed to create order
              </PrimaryButton>
              <SecondaryButton onClick={cart.clear} className="mt-4 h-14 w-full justify-center text-base">
                Clear cart
              </SecondaryButton>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <Button
      className={`inline-flex items-center rounded-full px-8 py-4 text-lg font-bold shadow-[0_10px_24px_rgba(36,180,199,0.25)] transition hover:-translate-y-[1px] hover:shadow-[0_14px_28px_rgba(36,180,199,0.34)] ${className}`}
      style={{ backgroundColor: BRAND.primary, color: "white" }}
      {...props}
    >
      {children}
    </Button>
  );
}

function SecondaryButton({ children, className = "", ...props }) {
  return (
    <Button
      variant="outline"
      className={`inline-flex items-center rounded-full border px-7 py-4 text-lg font-bold transition hover:-translate-y-[1px] ${className}`}
      style={{ borderColor: BRAND.line, color: BRAND.ink, backgroundColor: "rgba(255,255,255,0.76)" }}
      {...props}
    >
      {children}
    </Button>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: BRAND.line, backgroundColor: BRAND.bg }}>
      <AppShell>
        <div className="grid gap-10 py-16 lg:grid-cols-[1.15fr_0.9fr_0.9fr_0.75fr]">
          <div>
            <Logo navigate={navigate} />
            <p className="mt-6 max-w-lg text-lg leading-8" style={{ color: BRAND.primaryDark }}>
              Providing premium online printing services across the UK. From same-day essentials to bespoke print jobs, this starter theme is ready to evolve into your full API-connected storefront.
            </p>
          </div>
          <FooterCol title="Products" items={[["Stapled Booklets", "/booklets"], ["Wiro Bound Booklets", "/booklets"], ["Business Cards", "/standard-business-cards"], ["Flyers", "/flyers"], ["Posters", "/posters-large-format-prints"]]} navigate={navigate} />
          <FooterCol title="Same Day Printing" items={[["Same Day Posters", "/posters-large-format-prints"], ["Same Day Business Cards", "/standard-business-cards"], ["Same Day Flyers", "/flyers"], ["Same Day Stationery", "/all-products"]]} navigate={navigate} />
          <FooterCol title="Company" items={[["About Us", "/"], ["Contact", "/bespoke-quote"], ["FAQ", "/all-products"], ["Privacy Policy", "/"], ["Terms of Service", "/"]]} navigate={navigate} />
        </div>
        <div className="border-t py-8 text-base" style={{ borderColor: BRAND.line, color: BRAND.primaryDark }}>
          © 2026 Atlantis Print. All rights reserved.
        </div>
      </AppShell>
    </footer>
  );
}

function FooterCol({ title, items, navigate }) {
  return (
    <div>
      <div className="mb-5 text-xl font-black" style={{ color: BRAND.ink }}>{title}</div>
      <div className="grid gap-3">
        {items.map(([label, path]) => (
          <button key={label} onClick={() => navigate(path)} className="text-left text-lg transition hover:translate-x-1" style={{ color: BRAND.primaryDark }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function toTitle(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

export default function App() {
  const { path, navigate } = usePathState();
  const cart = useLocalCart();

  const addDemoProduct = () => {
    const config = {
      printedSides: "Double Sided",
      paperType: "Matt Uncoated",
      lamination: "Gloss",
      quantity: 200,
    };
    cart.addItem({
      name: "Business Cards",
      config,
      qty: 1,
      price: 175,
    });
  };

  const page = (() => {
    switch (path) {
      case "/standard-business-cards":
        return <ProductConfigurator productKey="businessCards" addItem={cart.addItem} />;
      case "/flyers":
        return <ProductConfigurator productKey="flyers" addItem={cart.addItem} />;
      case "/posters-large-format-prints":
        return <ProductConfigurator productKey="posters" addItem={cart.addItem} />;
      case "/booklets":
        return <BookletsPage navigate={navigate} />;
      case "/all-products":
        return <AllProductsPage navigate={navigate} />;
      case "/bespoke-quote":
        return <BespokeQuotePage />;
      case "/cart":
        return <CartPage cart={cart} navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} addDemoProduct={addDemoProduct} />;
    }
  })();

  return (
    <div className="min-h-screen" style={{ backgroundColor: BRAND.bg }}>
      <Header navigate={navigate} cartCount={cart.items.length} cartSubtotal={cart.subtotal} currentPath={path} />
      {page}
      <Footer navigate={navigate} />
    </div>
  );
}