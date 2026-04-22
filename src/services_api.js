
const API_BASE = "/api/proxy";

export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    return await res.json();
  } catch {
    return [];
  }
}

export async function createOrder(payload) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function getOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders-list`);
    return await res.json();
  } catch {
    return [];
  }
}

export async function uploadArtwork(file) {
  try {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch(`${API_BASE}/artwork`, {
      method: "POST",
      body: form,
    });

    return await res.json();
  } catch {
    return { success: false };
  }
}
