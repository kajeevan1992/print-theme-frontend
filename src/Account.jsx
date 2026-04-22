
import React, { useEffect, useState } from "react";
import { getOrders } from "./services_api";

function currency(v){return new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP"}).format(v||0);}

function State({title,text}){
  return <div className="p-5 border rounded-[14px] text-[12px]" style={{borderColor:"#E2E6E8",color:"#667179"}}>
    <b style={{color:"#121517"}}>{title}</b>
    <div className="mt-2">{text}</div>
  </div>
}

export default function Account({navigate,setSelectedOrder}){
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    getOrders().then(r=>{
      setOrders(Array.isArray(r)?r:[]);
      setLoading(false);
    });
  },[]);

  return <section className="py-6">
    <div className="mx-auto max-w-[1100px] px-4">
      <h1 className="text-[28px] font-black mb-4">Dashboard</h1>

      {loading && <State title="Loading" text="Fetching orders safely"/>}
      {!loading && orders.length===0 && <State title="No orders" text="Orders will appear here"/>}

      <div className="grid gap-4">
        {orders.map((o,i)=>(
          <div key={i} className="p-4 border rounded-[14px]" style={{borderColor:"#E2E6E8"}}>
            <div className="flex justify-between">
              <b>Order #{o.id||i+1}</b>
              <span>{o.status||"Processing"}</span>
            </div>

            <div className="mt-3 text-[12px] text-[#667179]">
              Total {currency(o.total)}
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={()=>{setSelectedOrder(o);navigate("/account/order")}} className="px-3 py-2 bg-black text-white rounded-full text-[11px]">View</button>
              <button onClick={()=>navigate("/artwork-upload")} className="px-3 py-2 border rounded-full text-[11px]">Artwork</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
}
