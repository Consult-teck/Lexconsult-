import { useState, useEffect } from "react";
import { updateBookingStatus } from "../data/store";
import "../styles/global.css";

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);
  const [tab, setTab] = useState("overview");

  const load = () => {
    setBookings(JSON.parse(localStorage.getItem("lc_bookings") || "[]"));
    setCases(JSON.parse(localStorage.getItem("lc_cases") || "[]"));
    setUsers(JSON.parse(localStorage.getItem("lc_users") || "[]").map(u => { const { password, ...rest } = u; return rest; }));
  };

  useEffect(() => { load(); }, []);

  const handleBookingAction = (id, status) => {
    updateBookingStatus(id, status);
    load();
  };

  const statusColor = (s) => ({ confirmed: "badge-success", pending: "badge-gold", cancelled: "badge-danger" }[s] || "badge-navy");
  const caseStatusColor = (s) => ({ open: "badge-success", in_progress: "badge-gold", closed: "badge-navy" }[s] || "badge-navy");

  const tabs = ["overview", "bookings", "cases", "users"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <div style={{ background: "var(--navy)", padding: "100px 24px 40px" }}>
        <div className="container">
          <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 6 }}>Platform management and oversight.</p>
        </div>
      </div>

      <div className="section container">
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {[
            ["👥", users.length, "Registered Users"],
            ["📅", bookings.length, "Total Bookings"],
            ["⚖️", cases.length, "Total Cases"],
            ["✅", cases.filter(c => c.status === "closed").length, "Resolved Cases"],
          ].map(([icon, val, label]) => (
            <div key={label} className="card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: "1.8rem" }}>{icon}</span>
              <div>
                <strong style={{ display: "block", fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--navy)", lineHeight: 1 }}>{val}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dash-tabs" style={{ marginBottom: 24 }}>
          {tabs.map(t => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)} style={{ textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="grid-2">
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Recent Bookings</h3>
              {bookings.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>No bookings yet.</p>
              ) : (
                bookings.slice(-5).reverse().map(b => (
                  <div key={b.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.86rem" }}>
                    <div>
                      <strong style={{ display: "block", color: "var(--navy)" }}>{b.userName}</strong>
                      <span style={{ color: "var(--text-muted)" }}>→ {b.lawyerName} · {b.date} {b.time}</span>
                    </div>
                    <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                  </div>
                ))
              )}
            </div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 16, fontSize: "1rem" }}>Recent Cases</h3>
              {cases.length === 0 ? (
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>No cases yet.</p>
              ) : (
                cases.slice(-5).reverse().map(c => (
                  <div key={c.id} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.86rem" }}>
                    <div>
                      <strong style={{ display: "block", color: "var(--navy)" }}>{c.title}</strong>
                      <span style={{ color: "var(--text-muted)" }}>{c.userName} · {c.category}</span>
                    </div>
                    <span className={`badge ${caseStatusColor(c.status)}`}>{c.status}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* All Bookings */}
        {tab === "bookings" && (
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 20, fontSize: "1rem" }}>All Bookings ({bookings.length})</h3>
            {bookings.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No bookings yet.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      {["Client", "Lawyer", "Service", "Date", "Time", "Fee", "Status", "Actions"].map(h => (
                        <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px" }}><strong>{b.userName}</strong></td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{b.lawyerName}</td>
                        <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{b.caseType}</td>
                        <td style={{ padding: "12px" }}>{b.date}</td>
                        <td style={{ padding: "12px" }}>{b.time}</td>
                        <td style={{ padding: "12px", fontWeight: 700, color: "var(--gold-dark)" }}>₦{b.fee?.toLocaleString()}</td>
                        <td style={{ padding: "12px" }}><span className={`badge ${statusColor(b.status)}`}>{b.status}</span></td>
                        <td style={{ padding: "12px" }}>
                          {b.status === "pending" && (
                            <div style={{ display: "flex", gap: 6 }}>
                              <button className="btn-primary" style={{ fontSize: "0.72rem", padding: "5px 10px" }} onClick={() => handleBookingAction(b.id, "confirmed")}>Confirm</button>
                              <button className="btn-danger" style={{ fontSize: "0.72rem", padding: "5px 10px" }} onClick={() => handleBookingAction(b.id, "cancelled")}>Cancel</button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* All Cases */}
        {tab === "cases" && (
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 20, fontSize: "1rem" }}>All Cases ({cases.length})</h3>
            {cases.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No cases yet.</p>
            ) : cases.map(c => (
              <div key={c.id} style={{ padding: "16px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <strong style={{ display: "block", color: "var(--navy)", marginBottom: 4 }}>{c.title}</strong>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{c.userName} · {c.category} · {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginTop: 6, maxWidth: 600 }}>{c.description.slice(0, 120)}...</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                  <span className={`badge ${caseStatusColor(c.status)}`}>{c.status}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.updates?.length} updates</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users */}
        {tab === "users" && (
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 20, fontSize: "1rem" }}>Registered Users ({users.length})</h3>
            {users.map(u => (
              <div key={u.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 14, fontSize: "0.87rem" }}>
                <div style={{ width: 42, height: 42, background: "var(--navy)", color: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0 }}>
                  {u.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ display: "block", color: "var(--navy)" }}>{u.name}</strong>
                  <span style={{ color: "var(--text-muted)" }}>{u.email} · {u.phone || "No phone"}</span>
                </div>
                <span className={`badge ${u.role === "admin" ? "badge-danger" : "badge-gold"}`}>{u.role}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
