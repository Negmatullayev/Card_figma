import React from "react";

export default function MenuGrid({ menu = [], cart = {}, onAdd, onRemove }) {
  return (
    <section className="menu-grid">
      <h3>Explore Menu</h3>
      <div className="menu-filters">
        <button className="tag active">Main Course <span>35</span></button>
        <button className="tag">Soup</button>
        <button className="tag">Salads</button>
        <button className="tag">Appetizer</button>
      </div>

      <div className="grid">
        {menu.map((m) => (
          <div key={m.id} className="menu-card">
            <div className="image-placeholder">🖼️</div>
            <div className="menu-body">
              <div className="menu-title">{m.title}</div>
              <div className="menu-cat">{m.category}</div>
              <div className="menu-bottom">
                <div className="price">${m.price.toFixed(2)}</div>
                <div className="qty">
                  <button onClick={() => onRemove && onRemove(m.id)}>-</button>
                  <span>{cart[m.id] || 0}</span>
                  <button onClick={() => onAdd && onAdd(m.id)}>+</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}