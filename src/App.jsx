import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import OrderLine from "./components/OrderLine/OrderLine";
import MenuGrid from "./components/MenuGrid/MenuGrid";
import OrderPanel from "./components/OrderPanel/OrderPanel";

import sampleMenu from "./Data/Menu";

export default function App() {
  const [orders, setOrders] = useState([
    { id: "NOB25", table: "Table 04", itemsCount: 8, status: "Wait List", time: "30 min ago", items: [] },
    { id: "NOB24", table: "Table 03", itemsCount: 8, status: "In Kitchen", time: "2 min ago", items: [] },
    { id: "NOB23", table: "Table 02", itemsCount: 8, status: "Ready", time: "20 min ago", items: [] },
  ]);
  const [cart, setCart] = useState({});
  const [menu] = useState(sampleMenu);

  const addToCart = (menuId) => {
    setCart((c) => {
      const updated = Object.assign({}, c);
      updated[menuId] = (c[menuId] || 0) + 1;
      return updated;
    });
  };

  const removeFromCart = (menuId) => {
    setCart((c) => {
      if ((c[menuId] || 0) <= 1) {
        const updated = Object.assign({}, c);
        delete updated[menuId];
        return updated;
      }
      const updated = Object.assign({}, c);
      updated[menuId] = c[menuId] - 1;
      return updated;
    });
  };

  const clearCart = () => setCart({});

  const placeOrder = ({ table = "Table 05", paymentMethod = "Card" } = {}) => {
    const items = Object.entries(cart).map(([id, qty]) => {
      const m = menu.find((x) => String(x.id) === String(id));
      return {
        id,
        name: m?.title ?? "Unknown",
        qty,
        price: m?.price ?? 0,
      };
    });

    if (items.length === 0) {
      alert("Savat bo'sh — iltimos avval buyurtma qo'shing.");
      return;
    }

    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    const tax = +(subtotal * 0.1).toFixed(2);
    const gratuity = +(subtotal * 0.15).toFixed(2);
    const total = +(subtotal + tax + gratuity).toFixed(2);

    const newOrder = {
      id: `ORD${Date.now()}`,
      table,
      itemsCount: items.reduce((s, i) => s + i.qty, 0),
      status: "Wait List",
      time: "Just Now",
      items,
      paymentMethod,
      subtotal,
      tax,
      gratuity,
      total,
    };

    setOrders((o) => {
      const newList = [newOrder];
      for (let i = 0; i < o.length; i++) {
        newList.push(o[i]);
      }
      return newList;
    });

    clearCart();
    alert(`Buyurtma qabul qilindi: ${newOrder.id} — Jami: $${newOrder.total.toFixed(2)}`);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <div className="left">
            <OrderLine orders={orders} />
            <MenuGrid menu={menu} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
          </div>
          <div className="right">
            <OrderPanel
              menu={menu}
              cart={cart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onPlaceOrder={placeOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}