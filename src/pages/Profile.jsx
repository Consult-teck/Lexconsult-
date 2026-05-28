import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserBookings, getUserCases } from "../data/store";
import { useToast } from "../hooks/useToast";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const { showToast, ToastComponent } = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user.name, phone: user.phone || "" });

  const bookings = getUserBookings(user.id);
  const cases = getUserCases(user.id);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setEditing(false);
    showToast("Profile updated!", "success");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <div style={{ background: "var(--navy)", padding: "100px 24px 40px" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 80, height: 80, background: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 700, color: "var(--navy)", fontFamily: "'Playfair Display', serif", flexShrink: 0 }}>
            {user.avatar}
          </div>
          <div>
            <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>{user.name}</h1>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem" }}>{user.email} · <span className="badge badge-gold">{user.role}</span></p>
          </div>
        </div>
      </div>

      <div className="section container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Profile Info */}
          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1rem" }}>Personal Information</h3>
              <button className="btn-secondary" style={{ fontSize: "0.8rem", padding: "7px 14px" }} onClick={() => setEditing(!editing)}>
                {editing ? "Cancel" : "Edit"}
              </button>
            </div>
            {editing ? (
              <form onSubmit={handleSave}>
                <div className="form-group"><label>Full Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
                <button type="submit" className="btn-primary">Save Changes</button>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["Full Name", user.name], ["Email", user.email], ["Phone", user.phone || "Not set"], ["Role", user.role], ["Member Since", new Date().getFullYear()]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
                    <span style={{ color: "var(--text-muted)" }}>{k}</span>
                    <strong style={{ color: "var(--navy)" }}>{v}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Total Bookings", value: bookings.length, icon: "📅" },
              { label: "Active Cases", value: cases.filter(c => c.status !== "closed").length, icon: "⚖️" },
              { label: "Closed Cases", value: cases.filter(c => c.status === "closed").length, icon: "✅" },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                <div>
                  <strong style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--navy)" }}>{s.value}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}
