
import React, { useEffect, useState } from "react";
import { getOrders } from "./services_api";

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value || 0);
}

export default function Account({ navigate, setSelectedOrder }) {
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
      <div className="mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Customer account</div>
            <h1 className="mt-2 text-[32px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Your order dashboard</h1>
          </div>
          <button onClick={() => navigate("/")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
            Back to store
          </button>
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
            <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Overview</div>
                <div className="mt-2 text-[26px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Current account status</div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Orders", String(orders.length || 0)],
                ["Awaiting artwork", orders.length ? "Live status later" : "0"],
                ["In production", "API later"],
                ["Completed", "API later"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[14px] border bg-[#FBFCFD] px-4 py-3" style={{ borderColor: "#E2E6E8" }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "#667179" }}>{label}</div>
                  <div className="mt-2 text-[20px] font-black tracking-[-0.03em]" style={{ color: "#121517" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8", height: "fit-content" }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Quick actions</div>
            <div className="mt-4 grid gap-3">
              <button onClick={() => navigate("/artwork-upload")} className="rounded-full bg-[#121517] px-4 py-3 text-[12px] font-bold text-white">
                Upload artwork
              </button>
              <button onClick={() => navigate("/checkout")} className="rounded-full border px-4 py-3 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                Start new order
              </button>
              <button onClick={() => navigate("/login")} className="rounded-full border px-4 py-3 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                Login & account
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Recent orders</div>
            <div className="mt-2 text-[26px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Manage your current print jobs</div>
          </div>
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
                <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="text-[15px] font-black" style={{ color: "#121517" }}>Order #{order.id || idx + 1}</div>
                      <div className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "#E2E6E8", color: "rgb(24, 167, 208)" }}>
                        {order.status || "Processing"}
                      </div>
                    </div>
                    <div className="mt-1 text-[12px]" style={{ color: "#667179" }}>{order.created_at || "Pending sync from API"}</div>

                    <div className="mt-4 grid gap-3 md:grid-cols-4">
                      <div className="rounded-[12px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                        <div className="font-bold" style={{ color: "#121517" }}>Total</div>
                        <div className="mt-1" style={{ color: "#667179" }}>{currency(order.total || 0)}</div>
                      </div>
                      <div className="rounded-[12px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                        <div className="font-bold" style={{ color: "#121517" }}>Artwork</div>
                        <div className="mt-1" style={{ color: "#667179" }}>{order.artwork_status || "Awaiting artwork / API status"}</div>
                      </div>
                      <div className="rounded-[12px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                        <div className="font-bold" style={{ color: "#121517" }}>Delivery</div>
                        <div className="mt-1" style={{ color: "#667179" }}>{order.delivery || "Standard delivery"}</div>
                      </div>
                      <div className="rounded-[12px] border bg-[#FBFCFD] px-4 py-3 text-[12px]" style={{ borderColor: "#E2E6E8" }}>
                        <div className="font-bold" style={{ color: "#121517" }}>Needs action</div>
                        <div className="mt-1" style={{ color: "#667179" }}>{order.artwork_status ? "Review status" : "Upload artwork"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <button
                      onClick={() => {
                        setSelectedOrder?.(order);
                        navigate("/account/order");
                      }}
                      className="rounded-full bg-[#121517] px-4 py-2 text-[12px] font-bold text-white"
                    >
                      View order
                    </button>
                    <button onClick={() => navigate("/artwork-upload")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                      Upload artwork
                    </button>
                    <button onClick={() => navigate("/checkout")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                      Reorder
                    </button>
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
