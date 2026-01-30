import React from "react";

export default function OrderLine({ orders = [] }) {
  return (
    <section className="order-line">
      <h2>Order Line</h2>

      <div className="orders">
        {orders.map((o) => (
          <div key={o.id} className="order-card">
            <div className="order-top">
              <strong>Order #{o.id}</strong>
              <span className="table">{o.table}</span>
            </div>
            <div className="order-body">
              <div>Item : x{o.itemsCount}</div>
              <div className="time">{o.time}</div>
            </div>
            <div className={`status ${o.status.replace(/\s+/g, "-").toLowerCase()}`}>{o.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}