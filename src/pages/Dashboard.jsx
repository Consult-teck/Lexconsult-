import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserBookings, getUserCases, updateBookingStatus } from "../data/store";
import { useToast } from "../hooks/useToast";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useAuth();
  const { showToast, ToastComponent } = useToast();
  const [bookings, setBookings] = useState([]);
  const [cases, setCases] = useState([]);
  const [tab, setTab] = useState("bookings");

  useEffect(() => {
    setBookings(getUserBookings(user.id));
    setCases(getUserCases(user.id));
  }, [user.id]);

  const cancelBooking = (id) => {
    updateBookingStatus(id, "cancelled");
    setBookings(getUserBookings(user.id));
    showToast("Booking cancelled.", "info");
  };

  const statusColor = (s) => {
    if (s === "confirmed") return "badge-success";
    if (s === "pending") return "badge-gold";
    if (s === "cancelled") return "badge-danger";
    return "badge-navy";
  };

  const caseStatusColor = (s) => {
    if (s === "open") return "badge-success";
    if (s === "in_progress") return "badge-gold";
    if (s === "closed") return "badge-navy";
    return "badge-navy";
  };

  const upcoming = bookings.filter(b => b.status !== "cancelled" && new Date(b.date) >= new Date());
  const past = bookings.filter(b => b.status === "cancelled" || new Date(b.date) < new Date());

  return (
    <div className="dashboard-page">
      <div className="dash-hero">
        <div className="container">
          <div>
            <h1>Welcome back, {user.name.split(" ")[0]}</h1>
            <p>Manage your consultations and track your legal cases.</p>
          </div>
          <Link to="/lawyers" className="btn-primary">+ New Booking</Link>
        </div>
      </div>

      <div className="section container">
        {/* Stats */}
        <div className="dash-stats">
          <div className="dash-stat-card">
            <span className="ds-icon">📅</span>
            <div>
              <strong>{upcoming.length}</strong>
              <span>Upcoming Bookings</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="ds-icon">⚖️</span>
            <div>
              <strong>{cases.length}</strong>
              <span>Active Cases</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="ds-icon">✓</span>
            <div>
              <strong>{cases.filter(c => c.status === "closed").length}</strong>
              <span>Resolved Cases</span>
            </div>
          </div>
          <div className="dash-stat-card">
            <span className="ds-icon">💬</span>
            <div>
              <strong>{bookings.length}</strong>
              <span>Total Consultations</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dash-tabs">
          <button className={tab === "bookings" ? "active" : ""} onClick={() => setTab("bookings")}>
            My Bookings <span className="tab-count">{bookings.length}</span>
          </button>
          <button className={tab === "cases" ? "active" : ""} onClick={() => setTab("cases")}>
            My Cases <span className="tab-count">{cases.length}</span>
          </button>
        </div>

        {tab === "bookings" && (
          <div className="dash-content">
            {bookings.length === 0 ? (
              <div className="empty-state">
                <span>📅</span>
                <h3>No bookings yet</h3>
                <p>Book a consultation with one of our expert lawyers.</p>
                <Link to="/lawyers" className="btn-primary">Find a Lawyer</Link>
              </div>
            ) : (
              <>
                {upcoming.length > 0 && (
                  <div className="booking-section">
                    <h3>Upcoming</h3>
                    {upcoming.map(b => (
                      <div key={b.id} className="booking-item card">
                        <div className="bi-main">
                          <div className="bi-lawyer">{b.lawyerName[0]}</div>
                          <div className="bi-info">
                            <strong>{b.lawyerName}</strong>
                            <span>{b.specialization} · {b.caseType}</span>
                          </div>
                          <div className="bi-date">
                            <strong>{new Date(b.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</strong>
                            <span>{b.time}</span>
                          </div>
                          <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                          <div className="bi-actions">
                            <span className="bi-fee">₦{b.fee?.toLocaleString()}</span>
                            {b.status !== "cancelled" && (
                              <button className="btn-danger" onClick={() => cancelBooking(b.id)}>Cancel</button>
                            )}
                          </div>
                        </div>
                        {b.description && <p className="bi-desc">{b.description}</p>}
                      </div>
                    ))}
                  </div>
                )}
                {past.length > 0 && (
                  <div className="booking-section">
                    <h3>Past / Cancelled</h3>
                    {past.map(b => (
                      <div key={b.id} className="booking-item card muted">
                        <div className="bi-main">
                          <div className="bi-lawyer">{b.lawyerName[0]}</div>
                          <div className="bi-info">
                            <strong>{b.lawyerName}</strong>
                            <span>{b.specialization} · {b.caseType}</span>
                          </div>
                          <div className="bi-date">
                            <strong>{new Date(b.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</strong>
                            <span>{b.time}</span>
                          </div>
                          <span className={`badge ${statusColor(b.status)}`}>{b.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "cases" && (
          <div className="dash-content">
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
              <Link to="/cases" className="btn-dark">+ Open New Case</Link>
            </div>
            {cases.length === 0 ? (
              <div className="empty-state">
                <span>⚖️</span>
                <h3>No cases yet</h3>
                <p>Open a case to begin formal legal proceedings.</p>
                <Link to="/cases" className="btn-primary">Open a Case</Link>
              </div>
            ) : (
              cases.map(c => (
                <div key={c.id} className="case-item card">
                  <div className="ci-header">
                    <div>
                      <strong>{c.title}</strong>
                      <span className="ci-type">{c.category}</span>
                    </div>
                    <span className={`badge ${caseStatusColor(c.status)}`}>{c.status.replace("_", " ")}</span>
                  </div>
                  <p className="ci-desc">{c.description}</p>
                  <div className="ci-footer">
                    <span>Opened: {new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>{c.updates?.length || 0} update{c.updates?.length !== 1 ? "s" : ""}</span>
                    <Link to="/cases" className="btn-secondary" style={{ fontSize: "0.8rem", padding: "6px 14px" }}>View Details</Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {ToastComponent}
    </div>
  );
}
