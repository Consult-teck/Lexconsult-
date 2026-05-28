import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div>
      <div className="page-hero">
        <h1>Contact Us</h1>
        <div className="gold-line"></div>
        <p>We'd love to hear from you. Reach out any time.</p>
      </div>

      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }}>
            {/* Info */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "var(--navy)", marginBottom: 12 }}>Let's Talk</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: 36, lineHeight: 1.75 }}>
                Have a question or want to know more about our services? Our team is here to help. Fill in the form or use the contact details below.
              </p>
              {[
                ["📍", "Address", "LEAD CITY UNIVERSITY"],
                ["📞", "Phone", "+234 800 LEX CONSULT"],
                ["✉️", "Email", "info@lexconsult.com"],
                ["🕐", "Working Hours", "Monday – Friday, 8:00 AM – 6:00 PM"],
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 4 }}>{label}</strong>
                    <span style={{ color: "var(--text-primary)", fontSize: "0.92rem" }}>{val}</span>
                  </div>
                </div>
              ))}

              {/* Social */}
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: 12 }}>Follow Us</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {["𝕏", "in", "f"].map(s => (
                    <a key={s} href="#" style={{ width: 38, height: 38, border: "1.5px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold-dark)", fontSize: "0.9rem", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.color = "var(--navy)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--gold-dark)"; }}>
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            {!sent ? (
              <div className="card" style={{ padding: 36 }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--navy)", marginBottom: 6 }}>Send a Message</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: 24 }}>We'll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input type="text" placeholder="Chukwuemeka Obi" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="How can we help you?" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={5} placeholder="Tell us more about your enquiry..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ minHeight: 130 }}></textarea>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }} disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="card" style={{ padding: 56, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, background: "var(--success)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", color: "white", margin: "0 auto 20px" }}>✓</div>
                <h3 style={{ color: "var(--navy)", marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.65 }}>Thank you for reaching out. A member of our team will respond within 24 hours.</p>
                <button className="btn-secondary" style={{ marginTop: 24 }} onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setSent(false); }}>
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
