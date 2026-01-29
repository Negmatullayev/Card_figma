import React, { useMemo, useState } from "react";

export default function OrderPanel({ menu = [], cart = {}, onAdd, onRemove, onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const cartItems = useMemo(() => {
    return Object.entries(cart).map(([id, qty]) => {
      const m = menu.find((x) => String(x.id) === String(id));
      return {
        id,
        name: m?.title ?? "Unknown",
        qty,
        price: m?.price ?? 0,
      };
    });
  }, [cart, menu]);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = +(subtotal * 0.1).toFixed(2);
  const gratuity = +(subtotal * 0.15).toFixed(2);
  const total = +(subtotal + tax + gratuity).toFixed(2);

  return (
    <aside className="order-panel">
      <div className="panel-header">
        <h4>Table No #05</h4>
        <div className="icons">✏️ 🗑️ 🖨️</div>
      </div>

      <div className="ordered-items">
        <h5>Ordered Items</h5>
        {cartItems.length === 0 && <div style={{ color: "#888" }}>Savat bo'sh</div>}
        {cartItems.map((o) => (
          <div key={o.id} className="ordered-row">
            <div className="left" style={{ display: "flex", alignItems: "center" }}>
              <span className="pill">x{o.qty}</span>
              <div style={{ marginRight: 8 }}>{o.name}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => onRemove && onRemove(o.id)}>-</button>
                <button onClick={() => onAdd && onAdd(o.id)}>+</button>
              </div>
            </div>
            <div className="price">${(o.price * o.qty).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div className="payment-summary">
        <h5>Payment Summary</h5>
        <div className="row"><span>Sub Total</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div className="row"><span>Tax</span><strong>${tax.toFixed(2)}</strong></div>
        <div className="row"><span>Gratuity</span><strong>${gratuity.toFixed(2)}</strong></div>
        <div className="row total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ marginBottom: 8 }}>Payment Method</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className={paymentMethod === "Cash" ? "tag active" : "tag"} onClick={() => setPaymentMethod("Cash")}>Cash</button>
          <button className={paymentMethod === "Card" ? "tag active" : "tag"} onClick={() => setPaymentMethod("Card")}>Card</button>
          <button className={paymentMethod === "Scan" ? "tag active" : "tag"} onClick={() => setPaymentMethod("Scan")}>Scan</button>
        </div>
      </div>

      <button
        className="place-order"
        onClick={() => onPlaceOrder && onPlaceOrder({ table: "Table 05", paymentMethod })}
      >
        Place Order
      </button>
    </aside>
  );
}