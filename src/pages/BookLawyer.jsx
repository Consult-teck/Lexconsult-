import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getLawyerById, saveBooking } from "../data/store";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import "./BookLawyer.css";

const CASE_TYPES = ["Initial Consultation", "Full Representation", "Document Review", "Legal Advice", "Court Appearance", "Mediation"];
const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function BookLawyer() {
  const { lawyerId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const lawyer = getLawyerById(lawyerId);

  const [form, setForm] = useState({
    date: "",
    time: "",
    caseType: "",
    description: "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!lawyer) return (
    <div className="section container" style={{ textAlign: "center", padding: "100px 24px" }}>
      <h2>Lawyer not found.</h2>
      <Link to="/lawyers" className="btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>Back to Lawyers</Link>
    </div>
  );

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time || !form.caseType || !form.description) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    // Check date is not in the past
    if (new Date(form.date) < new Date(new Date().toDateString())) {
      showToast("Please select a future date.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveBooking({
        userId: user.id,
        userName: user.name,
        lawyerId: lawyer.id,
        lawyerName: lawyer.name,
        specialization: lawyer.specialization,
        fee: lawyer.fee,
        ...form,
      });
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  if (done) return (
    <div className="booking-success">
      <div className="bs-card">
        <div className="bs-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p>Your consultation with <strong>{lawyer.name}</strong> has been booked for <strong>{form.date}</strong> at <strong>{form.time}</strong>.</p>
        <div className="bs-details">
          <div><span>Case Type</span><strong>{form.caseType}</strong></div>
          <div><span>Consultation Fee</span><strong>₦{lawyer.fee.toLocaleString()}</strong></div>
          <div><span>Status</span><strong style={{ color: "var(--gold-dark)" }}>Pending Confirmation</strong></div>
        </div>
        <p className="bs-note">You'll receive a confirmation once the lawyer accepts. Check your dashboard for updates.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
          <button className="btn-secondary" onClick={() => navigate("/lawyers")}>Book Another</button>
        </div>
      </div>
      {ToastComponent}
    </div>
  );

  return (
    <div className="book-page">
      <div className="page-hero">
        <h1>Book a Consultation</h1>
        <div className="gold-line"></div>
        <p>Schedule your session with {lawyer.name}</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="book-layout">
            {/* Lawyer Summary */}
            <div className="lawyer-summary card">
              <div className="ls-header">
                <div className="lc-avatar" style={{ width: 64, height: 64, fontSize: "1.3rem" }}>{lawyer.avatar}</div>
                <div>
                  <h3>{lawyer.name}</h3>
                  <span className="badge badge-gold">{lawyer.specialization}</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="ls-details">
                <div><span>Experience</span><strong>{lawyer.experience} years</strong></div>
                <div><span>Location</span><strong>{lawyer.location}</strong></div>
                <div><span>Languages</span><strong>{lawyer.languages.join(", ")}</strong></div>
                <div><span>Education</span><strong>{lawyer.education}</strong></div>
              </div>
              <div className="divider"></div>
              <div className="ls-fee">
                <span>Consultation Fee</span>
                <strong className="fee-amount">₦{lawyer.fee.toLocaleString()}</strong>
              </div>
              <p className="ls-bio">{lawyer.bio}</p>
            </div>

            {/* Booking Form */}
            <div className="booking-form card">
              <h3>Appointment Details</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: 24 }}>Fill in your details to confirm the booking.</p>

              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Preferred Date *</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split("T")[0]} required />
                  </div>
                  <div className="form-group">
                    <label>Preferred Time *</label>
                    <select name="time" value={form.time} onChange={handleChange} required>
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Type of Service *</label>
                  <select name="caseType" value={form.caseType} onChange={handleChange} required>
                    <option value="">Select service type</option>
                    {CASE_TYPES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="08012345678" required />
                </div>

                <div className="form-group">
                  <label>Brief Case Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your legal situation briefly. This helps the lawyer prepare for your session..." rows={4} required></textarea>
                </div>

                <div className="booking-disclaimer">
                  <span>ℹ</span>
                  <p>Payment of ₦{lawyer.fee.toLocaleString()} will be collected before the consultation. You will be contacted to confirm the appointment.</p>
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }} disabled={loading}>
                  {loading ? <><span className="spinner" style={{ width: 18, height: 18, border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "var(--navy)" }}></span> Processing...</> : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {ToastComponent}
    </div>
  );
}
