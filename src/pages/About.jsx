import { Link } from "react-router-dom";
import "./About.css";

const values = [
  { icon: "⚖️", title: "Justice for All", desc: "We believe quality legal representation should not be a privilege of the wealthy." },
  { icon: "🛡️", title: "Integrity First", desc: "All our lawyers are thoroughly vetted and bound by strict professional ethics." },
  { icon: "🤝", title: "Client-Centered", desc: "Your needs, timeline, and budget drive every decision we make." },
  { icon: "🔒", title: "Confidentiality", desc: "Your personal and legal information is always safe and protected." },
];

const team = [
  { name: "Barr. Tunde Fashola", role: "Founder & CEO", avatar: "TF" },
  { name: "Ngozi Okafor", role: "Head of Operations", avatar: "NO" },
  { name: "David Eze", role: "Legal Director", avatar: "DE" },
  { name: "Amina Bello", role: "Client Relations", avatar: "AB" },
];

export default function About() {
  return (
    <div>
      <div className="page-hero">
        <h1>About LexConsult</h1>
        <div className="gold-line"></div>
        <p>Nigeria's most trusted legal consultation platform since 2020.</p>
      </div>

      {/* MISSION */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div className="about-mission-grid">
            <div>
              <span className="eyebrow" style={{ color: "var(--gold-dark)" }}>Our Story</span>
              <h2 className="section-title" style={{ marginTop: 8 }}>Built to Bridge the Justice Gap</h2>
              <div className="gold-line" style={{ margin: "0 0 20px" }}></div>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 16 }}>
                LexConsult was born from a simple observation: millions of Nigerians face legal challenges every day but lack access to affordable, trusted legal help. Navigating the legal system alone is intimidating — and costly.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
                Since 2020, we've connected over 10,000 clients with experienced legal professionals across Nigeria — from Lagos to Kano, Port Harcourt to Abuja. Our platform makes it easy to find the right lawyer, book a consultation, and track your case from start to finish.
              </p>
              <Link to="/lawyers" className="btn-primary">Meet Our Lawyers</Link>
            </div>

            <div style={{ background: "var(--navy)", borderRadius: 16, padding: 40 }}>
              <div className="about-stats-grid">
                {[["10,000+", "Clients Served"], ["48", "Expert Lawyers"], ["6", "Cities"], ["98%", "Satisfaction Rate"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center", padding: 20, background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(201,168,76,0.1)" }}>
                    <strong style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "var(--gold)", display: "block", lineHeight: 1 }}>{n}</strong>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 8, display: "block" }}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Our Values</span>
          <h2 className="section-title" style={{ color: "white", marginTop: 8 }}>What We Stand For</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="grid-4">
            {values.map(v => (
              <div key={v.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 10, padding: 28 }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: 14 }}>{v.icon}</span>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "var(--gold)", marginBottom: 10, fontSize: "0.95rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold-dark)" }}>Leadership</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Our Team</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="grid-4">
            {team.map(t => (
              <div key={t.name} className="card" style={{ padding: 28, textAlign: "center" }}>
                <div style={{ width: 72, height: 72, background: "var(--navy)", color: "var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, margin: "0 auto 16px" }}>
                  {t.avatar}
                </div>
                <strong style={{ display: "block", color: "var(--navy)", fontSize: "0.95rem" }}>{t.name}</strong>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{t.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gold)", padding: "64px 24px", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ color: "var(--navy)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ color: "rgba(13,27,42,0.7)", marginBottom: 28 }}>Join thousands of Nigerians accessing justice through LexConsult.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-dark">Create Account</Link>
            <Link to="/contact" className="btn-secondary" style={{ borderColor: "var(--navy)", color: "var(--navy)" }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
