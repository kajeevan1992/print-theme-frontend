
import { useState } from "react";
import { createOrder } from "./services_api";

export default function Checkout({ cart }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [artwork, setArtwork] = useState(null);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = async () => {
    const res = await createOrder({
      ...data,
      items: cart.items,
      artwork
    });
    alert(res.success ? "Order placed!" : "Order failed");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout (Step {step}/6)</h2>

      {step === 1 && (
        <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})}/>
      )}

      {step === 2 && (
        <input placeholder="Company" onChange={e => setData({...data, company: e.target.value})}/>
      )}

      {step === 3 && (
        <input placeholder="Address" onChange={e => setData({...data, address: e.target.value})}/>
      )}

      {step === 4 && (
        <select onChange={e => setData({...data, delivery: e.target.value})}>
          <option>Standard</option>
          <option>Express</option>
        </select>
      )}

      {step === 5 && (
        <input type="file" onChange={e => setArtwork(e.target.files[0])}/>
      )}

      {step === 6 && (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={submit}>Submit Order</button>
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {step > 1 && <button onClick={back}>Back</button>}
        {step < 6 && <button onClick={next}>Next</button>}
      </div>
    </div>
  );
}
