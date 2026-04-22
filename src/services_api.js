
const API_BASE = "/api/proxy";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    return (await safeJson(res)) || [];
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
    return (await safeJson(res)) || { success: false, message: "No response body" };
  } catch {
    return { success: false, message: "Orders API unavailable" };
  }
}

export async function getOrders() {
  try {
    const res = await fetch(`${API_BASE}/orders-list`);
    return (await safeJson(res)) || [];
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
    return (await safeJson(res)) || { success: false, message: "No response body" };
  } catch {
    return { success: false, message: "Artwork API unavailable" };
  }
}
