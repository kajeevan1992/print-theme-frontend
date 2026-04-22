
import React, { useEffect, useState } from "react";
import { getOrders } from "./services_api";

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value || 0);
}

export default function Account({ navigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(Array.isArray(res) ? res : []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-6">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Customer account</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Your recent orders</h1>
          </div>
          <button onClick={() => navigate("/")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
            Back to store
          </button>
        </div>

        {loading ? (
          <div className="rounded-[18px] border bg-white p-6 text-[12px]" style={{ borderColor: "#E2E6E8", color: "#667179" }}>Loading orders…</div>
        ) : orders.length === 0 ? (
          <div className="rounded-[18px] border bg-white p-6 text-[12px]" style={{ borderColor: "#E2E6E8", color: "#667179" }}>
            No orders found yet. If the orders API is unavailable, this page stays safe instead of crashing.
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order, idx) => (
              <div key={order.id || idx} className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-[15px] font-black" style={{ color: "#121517" }}>Order #{order.id || idx + 1}</div>
                    <div className="mt-1 text-[12px]" style={{ color: "#667179" }}>{order.created_at || "Pending sync from API"}</div>
                  </div>
                  <div className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "#E2E6E8", color: "rgb(24, 167, 208)" }}>
                    {order.status || "Processing"}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  <div className="rounded-[14px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                    <div className="font-bold" style={{ color: "#121517" }}>Total</div>
                    <div className="mt-1" style={{ color: "#667179" }}>{currency(order.total || 0)}</div>
                  </div>
                  <div className="rounded-[14px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                    <div className="font-bold" style={{ color: "#121517" }}>Artwork</div>
                    <div className="mt-1" style={{ color: "#667179" }}>{order.artwork_status || "Awaiting artwork / API status"}</div>
                  </div>
                  <div className="rounded-[14px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                    <div className="font-bold" style={{ color: "#121517" }}>Delivery</div>
                    <div className="mt-1" style={{ color: "#667179" }}>{order.delivery || "Standard delivery"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
