# PrintShop Frontend

A full-featured print e-commerce frontend built with **React + Vite + Tailwind CSS**.

## Pages Included

| Page | Route |
|------|-------|
| Homepage | `/` |
| Products Listing | `/products` |
| Product Detail | `/product/:slug` |
| Checkout (3-step) | `/checkout` |
| My Account | `/account` |
| Wishlist | `/wishlist` |
| Special Finishes | `/special-finishes` |
| Free Sample Packs | `/samples` |
| Contact Us | `/contact` |
| FAQ | `/faq` |
| Delivery Info | `/delivery` |

## Features

- 🛒 Full cart with drawer, quantity controls, free delivery progress
- ❤️ Wishlist (persistent via Zustand)
- 🔍 Product search + category filters + sort + price range
- 📱 Fully responsive (mobile-first)
- 🖼️ Product hover images, quick-add button
- 💳 3-step checkout with validation
- 👤 Account page with login, orders, settings
- 🎨 Special finishes showcase
- 📦 Free sample pack request flow
- 🗺️ Mega-menu navigation

## Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

## Deploy with Coolify (Docker)

1. Push this repo to GitHub/GitLab
2. In Coolify, create a new service → **Dockerfile**
3. Set build context to root `/`
4. Deploy — Coolify will build and serve via nginx on port 80

## Connecting to Your API

All data is currently served from `src/data/products.js`. To connect to your real API:

- Replace product fetches in `ProductsPage.jsx` and `ProductDetailPage.jsx` with `useEffect` + `fetch('/api/products')`
- Replace cart actions in `src/context/store.js` with API calls
- Replace checkout submission in `CheckoutPage.jsx` with `POST /api/orders`
- Replace account data in `AccountPage.jsx` with `GET /api/account`

The store uses **Zustand** — easy to extend with API middleware.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- React Router v6
- Zustand (state management)
- Lucide React (icons)
