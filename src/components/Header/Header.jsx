import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="search">
        <input placeholder="Search" />
      </div>
      <div className="header-right">
        <div className="icon">🔔</div>
        <div className="user">
          <div className="avatar">👤</div>
          <div className="name">Abubakr Negmatullayev</div>
        </div>
      </div>
    </header>
  );
}