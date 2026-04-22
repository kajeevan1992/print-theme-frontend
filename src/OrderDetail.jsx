
import React from "react";

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value || 0);
}

export default function OrderDetail({ order, navigate }) {
  if (!order) {
    return (
      <section className="py-6">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[18px] border bg-white p-6 text-[12px]" style={{ borderColor: "#E2E6E8", color: "#667179" }}>
            Order details are unavailable. This route stays safe instead of crashing if order data is missing.
            <div className="mt-4">
              <button onClick={() => navigate("/account")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                Back to account
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Order detail</div>
            <h1 className="mt-2 text-[34px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Order #{order.id || "Pending"}</h1>
          </div>
          <button onClick={() => navigate("/account")} className="rounded-full border px-4 py-2 text-[12px] font-bold" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
            Back to account
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-4">
            <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
              <div className="text-[15px] font-black" style={{ color: "#121517" }}>Order items</div>
              <div className="mt-4 text-[12px]" style={{ color: "#667179" }}>
                Item-level detail is ready for real API data. This page stays safe even if only summary order data is available.
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[16px] border bg-white p-4" style={{ borderColor: "#E2E6E8" }}><div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "#667179" }}>Status</div><div className="mt-2 text-[14px] font-bold" style={{ color: "#121517" }}>{order.status || "Processing"}</div></div>
              <div className="rounded-[16px] border bg-white p-4" style={{ borderColor: "#E2E6E8" }}><div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "#667179" }}>Artwork</div><div className="mt-2 text-[14px] font-bold" style={{ color: "#121517" }}>{order.artwork_status || "Awaiting artwork"}</div></div>
              <div className="rounded-[16px] border bg-white p-4" style={{ borderColor: "#E2E6E8" }}><div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "#667179" }}>Delivery</div><div className="mt-2 text-[14px] font-bold" style={{ color: "#121517" }}>{order.delivery || "Standard delivery"}</div></div>
            </div>
          </div>

          <div className="rounded-[18px] border bg-white p-5 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8", height: "fit-content" }}>
            <div className="text-[20px] font-black tracking-[-0.03em]" style={{ color: "#121517" }}>Order summary</div>
            <div className="mt-4 space-y-3 text-[12px]" style={{ color: "#667179" }}>
              <div className="flex justify-between"><span>Order total</span><span>{currency(order.total || 0)}</span></div>
              <div className="flex justify-between"><span>Created</span><span>{order.created_at || "Pending sync"}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
