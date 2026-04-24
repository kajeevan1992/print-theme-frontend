import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, options) => {
    const { items } = get();
    const key = `${product.id}-${JSON.stringify(options)}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      set({ items: items.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i) });
    } else {
      set({ items: [...items, { key, product, options, qty: 1 }] });
    }
    set({ isOpen: true });
  },

  removeItem: (key) => set(state => ({ items: state.items.filter(i => i.key !== key) })),

  updateQty: (key, qty) => {
    if (qty < 1) return get().removeItem(key);
    set(state => ({ items: state.items.map(i => i.key === key ? { ...i, qty } : i) }));
  },

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  get total() {
    return get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  },
  get count() {
    return get().items.reduce((sum, i) => sum + i.qty, 0);
  },
}));

export const useWishlistStore = create((set, get) => ({
  items: [],
  toggle: (product) => {
    const { items } = get();
    const exists = items.find(i => i.id === product.id);
    if (exists) {
      set({ items: items.filter(i => i.id !== product.id) });
    } else {
      set({ items: [...items, product] });
    }
  },
  isWishlisted: (id) => get().items.some(i => i.id === id),
}));
