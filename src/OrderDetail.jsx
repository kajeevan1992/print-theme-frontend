
import React from "react";

function currency(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value || 0);
}

export default function OrderDetail({ order, navigate }) {
  const steps = ["Placed", "Artwork", "Production", "Complete"];

  if (!order) {
    return (
      <section className="py-6">
        <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-[16px] border bg-white p-5 text-[12px]" style={{ borderColor: "#E2E6E8", color: "#667179" }}>
            Order details are unavailable. This route stays safe instead of crashing if order data is missing.
            <div className="mt-4">
              <button onClick={() => navigate("/account")} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
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
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Order detail</div>
            <h1 className="mt-2 text-[32px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Order #{order.id || "Pending"}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/artwork-upload")} className="rounded-full bg-[#121517] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
              Upload artwork
            </button>
            <button onClick={() => navigate("/account")} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
              Back to account
            </button>
          </div>
        </div>

        <div className="mb-5 rounded-[16px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
          <div className="grid gap-3 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-[12px] border px-4 py-3 text-center" style={{ borderColor: i < 2 ? "rgb(24, 167, 208)" : "#E2E6E8", backgroundColor: i < 2 ? "#F1FAFD" : "white", color: i < 2 ? "#121517" : "#667179" }}>
                <div className="text-[10px] font-bold uppercase tracking-[0.12em]">{step}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
                <div className="text-[14px] font-black" style={{ color: "#121517" }}>Order information</div>
                <div className="mt-3 grid gap-2 text-[12px]" style={{ color: "#667179" }}>
                  <div><b>Created:</b> {order.created_at || "Pending sync"}</div>
                  <div><b>Delivery:</b> {order.delivery || "Standard delivery"}</div>
                  <div><b>Status:</b> {order.status || "Processing"}</div>
                </div>
              </div>

              <div className="rounded-[16px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
                <div className="text-[14px] font-black" style={{ color: "#121517" }}>Artwork & billing</div>
                <div className="mt-3 grid gap-2 text-[12px]" style={{ color: "#667179" }}>
                  <div><b>Artwork:</b> {order.artwork_status || "Awaiting artwork"}</div>
                  <div><b>Total:</b> {currency(order.total || 0)}</div>
                  <div><b>Support:</b> Available from actions panel</div>
                </div>
              </div>
            </div>

            <div className="rounded-[16px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8" }}>
              <div className="text-[14px] font-black" style={{ color: "#121517" }}>Items</div>
              <div className="mt-3 text-[12px] leading-6" style={{ color: "#667179" }}>
                Item-level product detail is ready for live API binding. This page is laid out for real product rows, proofs, invoices and delivery updates.
              </div>
            </div>
          </div>

          <div className="rounded-[16px] border bg-white p-4 shadow-[0_10px_24px_rgba(0,0,0,0.03)]" style={{ borderColor: "#E2E6E8", height: "fit-content" }}>
            <div className="text-[18px] font-black tracking-[-0.03em]" style={{ color: "#121517" }}>Next action</div>
            <div className="mt-4 grid gap-3">
              <button onClick={() => navigate("/artwork-upload")} className="rounded-full bg-[#121517] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                Upload artwork
              </button>
              <button onClick={() => navigate("/checkout")} className="rounded-full border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                Reorder
              </button>
              <button className="rounded-full border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ borderColor: "#E2E6E8", color: "#121517", backgroundColor: "white" }}>
                Contact support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
