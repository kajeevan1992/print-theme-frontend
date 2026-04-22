
import React, { useState } from "react";
import { Lock, Mail, UserRound, KeyRound, ShieldCheck, ChevronRight } from "lucide-react";

function Field({ icon: Icon, label, type = "text", placeholder = "" }) {
  return (
    <label className="grid gap-2">
      <span className="text-[12px] font-bold" style={{ color: "#121517" }}>{label}</span>
      <div className="flex h-11 items-center gap-3 rounded-xl border bg-white px-3" style={{ borderColor: "#E2E6E8" }}>
        <Icon className="h-4 w-4" style={{ color: "#667179" }} />
        <input type={type} placeholder={placeholder} className="w-full border-0 bg-transparent p-0 text-[13px] outline-none" />
      </div>
    </label>
  );
}

export default function AuthPage({ navigate }) {
  const [mode, setMode] = useState("login");
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[24px] border bg-white shadow-[0_16px_34px_rgba(0,0,0,0.04)] lg:grid-cols-[0.9fr_1.1fr]" style={{ borderColor: "#E2E6E8" }}>
          <div className="bg-[linear-gradient(180deg,#F8FBFC,#F1F5F7)] p-8">
            <div className="inline-flex rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "rgb(24, 167, 208)" }}>Customer portal</div>
            <h1 className="mt-4 text-[42px] font-black leading-[0.95] tracking-[-0.05em]" style={{ color: "#121517" }}>Manage orders, artwork and your print account.</h1>
            <p className="mt-4 max-w-[520px] text-[13px] leading-7" style={{ color: "#667179" }}>A cleaner auth entry point for customer-side order management, artwork upload, repeat jobs and account access.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Recent orders", "Track current and previous jobs"],
                ["Artwork handoff", "Upload files now or later"],
                ["Reorders", "Repeat frequent print jobs"],
                ["Account access", "Billing, delivery and support"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[16px] border bg-white p-4" style={{ borderColor: "#E2E6E8" }}>
                  <div className="text-[13px] font-bold" style={{ color: "#121517" }}>{title}</div>
                  <div className="mt-2 text-[12px] leading-6" style={{ color: "#667179" }}>{text}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[16px] border bg-white p-4" style={{ borderColor: "#E2E6E8" }}>
              <div className="flex items-center gap-2 text-[13px] font-bold" style={{ color: "#121517" }}>
                <ShieldCheck className="h-4 w-4" style={{ color: "rgb(24, 167, 208)" }} />
                Frontend auth UX only
              </div>
              <p className="mt-2 text-[12px] leading-6" style={{ color: "#667179" }}>Prepared for connection to your existing backend auth later without changing the portal layout.</p>
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              {[["login","Login"],["register","Register"],["forgot","Forgot password"]].map(([key,label]) => (
                <button key={key} onClick={() => setMode(key)} className="rounded-full border px-4 py-2 text-[12px] font-semibold"
                  style={{borderColor: mode===key?"rgb(24, 167, 208)":"#E2E6E8", backgroundColor: mode===key?"#F1FAFD":"white", color: mode===key?"#121517":"#667179"}}>
                  {label}
                </button>
              ))}
            </div>
            {mode==="login" && <div>
              <div className="text-[28px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Welcome back</div>
              <p className="mt-2 text-[12px] leading-6" style={{ color: "#667179" }}>Sign in to access orders, artwork and customer actions.</p>
              <div className="mt-5 grid gap-4">
                <Field icon={Mail} label="Email address" type="email" placeholder="name@example.com" />
                <Field icon={Lock} label="Password" type="password" placeholder="••••••••" />
                <button onClick={() => navigate("/account")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#121517] px-5 py-3 text-[12px] font-bold text-white">Sign in<ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>}
            {mode==="register" && <div>
              <div className="text-[28px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Create account</div>
              <p className="mt-2 text-[12px] leading-6" style={{ color: "#667179" }}>Set up a customer account for orders, artwork and repeat purchases.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field icon={UserRound} label="First name" placeholder="John" />
                <Field icon={UserRound} label="Last name" placeholder="Doe" />
                <div className="sm:col-span-2"><Field icon={Mail} label="Email address" type="email" placeholder="name@example.com" /></div>
                <div className="sm:col-span-2"><Field icon={Lock} label="Password" type="password" placeholder="Create a password" /></div>
                <div className="sm:col-span-2"><button onClick={() => navigate("/account")} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#121517] px-5 py-3 text-[12px] font-bold text-white">Create account<ChevronRight className="h-4 w-4" /></button></div>
              </div>
            </div>}
            {mode==="forgot" && <div>
              <div className="text-[28px] font-black tracking-[-0.04em]" style={{ color: "#121517" }}>Reset password</div>
              <p className="mt-2 text-[12px] leading-6" style={{ color: "#667179" }}>Enter your email and we’ll send you password reset instructions.</p>
              <div className="mt-5 grid gap-4">
                <Field icon={KeyRound} label="Account email" type="email" placeholder="name@example.com" />
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#121517] px-5 py-3 text-[12px] font-bold text-white">Send reset link<ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </section>
  );
}
