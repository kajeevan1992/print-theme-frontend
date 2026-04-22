
import { useEffect, useState } from "react";
import { getOrders } from "./services_api";

export default function Account() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i} style={{ border: "1px solid #eee", padding: 10, marginBottom: 10 }}>
            Order #{o.id || i}
          </div>
        ))
      )}
    </div>
  );
}
