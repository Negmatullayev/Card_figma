import React from "react";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)"
      }}>
        <div style={{
          width: 92,
          height: 92,
          borderRadius: 12,
          background: "#f6f6f8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48
        }}>
          📊
        </div>
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: "8px 0 0", color: "#666" }}>Bu yerda umumiy ko‘rsatkichlar, grafiklar va tezkor statistikalar bo‘ladi.</p>
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <div style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ color: "#999", fontSize: 12 }}>Orders Today</div>
          <div style={{ marginTop: 8, fontWeight: 700, fontSize: 22 }}>128</div>
        </div>
        <div style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ color: "#999", fontSize: 12 }}>Revenue</div>
          <div style={{ marginTop: 8, fontWeight: 700, fontSize: 22 }}>$4,520</div>
        </div>
        <div style={{ background: "#fff", padding: 12, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ color: "#999", fontSize: 12 }}>Active Tables</div>
          <div style={{ marginTop: 8, fontWeight: 700, fontSize: 22 }}>12</div>
        </div>
      </div>
    </div>
  );
}