import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import OrderLine from "./components/OrderLine/OrderLine";
import MenuGrid from "./components/MenuGrid/MenuGrid";
import OrderPanel from "./components/OrderPanel/OrderPanel";
import Dashboard from "./components/Dashboard/Dashboard";

import sampleMenu from "./Data/Menu";

export default function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("bistro_orders");
    return saved ? JSON.parse(saved) : [
      { id: "NOB25", table: "Table 04", itemsCount: 8, status: "Wait List", time: "Just Now", items: [] },
      { id: "NOB24", table: "Table 03", itemsCount: 8, status: "In Kitchen", time: "2 min ago", items: [] },
      { id: "NOB23", table: "Table 02", itemsCount: 8, status: "Ready", time: "20 min ago", items: [] },
    ];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("bistro_cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [menu] = useState(sampleMenu);
  useEffect(() => {
    localStorage.setItem("bistro_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("bistro_orders", JSON.stringify(orders));
  }, [orders]);
  const addToCart = (menuId) => {
    setCart((c) => ({ ...c, [menuId]: (c[menuId] || 0) + 1 }));
  };
  const removeFromCart = (menuId) => {
    setCart((c) => {
      const current = c[menuId] || 0;
      if (current <= 1) {
        const copy = { ...c };
        delete copy[menuId];
        return copy;
      }
      return { ...c, [menuId]: current - 1 };
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

    setOrders((o) => [newOrder, ...o]);
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