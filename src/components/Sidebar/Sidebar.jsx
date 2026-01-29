import React, { useState, useEffect } from "react";

const items = [
  { key: "Dashboard", icon: "🏠" },
  { key: "Order Line", icon: "🧾" },
  { key: "Manage Table", icon: "🍽️" },
  { key: "Menus", icon: "📚" },
  { key: "Customer", icon: "👥" },
  { key: "Analytics", icon: "📈" },
  { key: "Payment", icon: "💳" },
  { key: "Chat", icon: "💬" },
  { key: "Help Center", icon: "❓" },
  { key: "Setting", icon: "⚙️" },
];

export default function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("bistro_sidebar_collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("bistro_sidebar_collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const handleNavClick = (key) => {
    // Agar sidebar yopiq bo'lsa — ochib keyin sahifani tanlash,
    // shunda ochilgandan so'ng chapda nom (label) ko'rinadi.
    if (collapsed) {
      setCollapsed(false);
      // kichik kechikish yordamida UI aniq ochilib qolishini ta'minlash mumkin,
      // ammo ko'p hollarda darhol setActivePage qilish ham yetarli.
      setTimeout(() => setActivePage(key), 80);
    } else {
      setActivePage(key);
    }
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div
        className="brand"
        onClick={() => {
          setCollapsed(false);
          setActivePage("Dashboard");
        }}
        title="Bistro"
      >
        <div className="logo">{collapsed ? "🍽" : "🍽️"}</div>
        {!collapsed && <div className="title">Bistro</div>}
      </div>

      <nav>
        {items.map((it) => (
          <div
            key={it.key}
            className={`nav-item ${activePage === it.key ? "active" : ""}`}
            onClick={() => handleNavClick(it.key)}
            title={it.key}
          >
            <div className="icon">{it.icon}</div>
            {!collapsed && <div className="label">{it.key}</div>}
            {it.key === "Order Line" && !collapsed && <span className="badge">4</span>}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Open sidebar" : "Collapse sidebar"}
          title={collapsed ? "Ochish" : "Yopish"}
        >
          {collapsed ? "➤" : "◀"}
        </button>
        {!collapsed && <div className="footer-text">Toggle sidebar</div>}
      </div>
    </aside>
  );
}