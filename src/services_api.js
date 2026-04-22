
const RAW_API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE_URL)
    ? String(import.meta.env.VITE_API_BASE_URL).replace(/\/$/, "")
    : "/api/proxy";

const API_BASE = RAW_API_BASE;

async function safeJson(res) {
  try { return await res.json(); } catch { return null; }
}

async function safeFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, options);
    const data = await safeJson(res);
    return { ok: res.ok, status: res.status, data, message: data?.message || (!res.ok ? `Request failed (${res.status})` : "") };
  } catch {
    return { ok: false, status: 0, data: null, message: "API unavailable" };
  }
}

export async function getHealth() { return safeFetch('/health'); }
export async function getProducts() {
  const res = await safeFetch('/products');
  return Array.isArray(res.data) ? res.data : [];
}
export async function createOrder(payload) {
  const res = await safeFetch('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok ? (res.data || { success: true, message: 'Order submitted' }) : { success: false, message: res.message || 'Orders API unavailable' };
}
export async function getOrders() {
  const res = await safeFetch('/orders-list');
  return Array.isArray(res.data) ? res.data : [];
}
export async function uploadArtwork(file, meta = {}) {
  try {
    const form = new FormData();
    form.append('file', file);
    Object.entries(meta).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') form.append(key, String(value));
    });
    const res = await fetch(`${API_BASE}/artwork`, { method: 'POST', body: form });
    const data = await safeJson(res);
    return res.ok ? (data || { success: true }) : { success: false, message: data?.message || `Artwork upload failed (${res.status})` };
  } catch {
    return { success: false, message: 'Artwork API unavailable' };
  }
}
