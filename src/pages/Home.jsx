import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LAWYERS } from "../data/store";
import LawyerCard from "../components/LawyerCard";
import "./Home.css";

const STATS = [
  { value: "500+", label: "Cases Resolved" },
  { value: "48", label: "Expert Lawyers" },
  { value: "12", label: "Practice Areas" },
  { value: "98%", label: "Client Satisfaction" },
];

const SERVICES = [
  { icon: "🏢", title: "Corporate Law", desc: "Mergers, acquisitions, contracts, and business compliance for companies of all sizes." },
  { icon: "⚖️", title: "Criminal Defense", desc: "Vigorous legal representation for individuals facing criminal charges." },
  { icon: "👨‍👩‍👧", title: "Family Law", desc: "Divorce, custody, adoption, and all family-related legal matters handled with care." },
  { icon: "🏠", title: "Real Estate", desc: "Property transactions, disputes, land documentation, and conveyancing." },
  { icon: "✈️", title: "Immigration", desc: "Visas, work permits, citizenship applications, and immigration disputes." },
  { icon: "💡", title: "Intellectual Property", desc: "Protect your trademarks, patents, copyrights, and creative assets." },
];

const TESTIMONIALS = [
  { name: "Taiwo Adeyemi", role: "Business Owner", text: "LexConsult connected me with the perfect corporate lawyer within hours. The process was seamless and professional.", rating: 5 },
  { name: "Grace Nwachukwu", role: "Private Individual", text: "During my divorce, my lawyer was compassionate and thorough. I couldn't have asked for better guidance.", rating: 5 },
  { name: "Ibrahim Musa", role: "Startup Founder", text: "Got my IP protected quickly and affordably. The platform makes legal help actually accessible.", rating: 5 },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className={`hero-content ${visible ? "visible" : ""}`}>
          <span className="hero-eyebrow">Nigeria's Premier Legal Platform</span>
          <h1>
            Justice Is Only<br />
            <span className="gold-text">One Consultation</span><br />
            Away
          </h1>
          <p>Connect with experienced, verified lawyers across Nigeria. Book consultations, manage cases, and get the legal representation you deserve.</p>
          <div className="hero-cta">
            <Link to="/lawyers" className="btn-primary">Find a Lawyer</Link>
            <Link to="/about" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}>
              How It Works
            </Link>
          </div>
          <div className="hero-trust">
            <span>✓ Verified Lawyers</span>
            <span>✓ Secure Consultations</span>
            <span>✓ Transparent Fees</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card floating">
            <div className="hc-icon">⚖</div>
            <strong>New Booking</strong>
            <span>Corporate Law · Today 2PM</span>
          </div>
          <div className="hero-card floating delayed">
            <div className="hc-icon success-icon">✓</div>
            <strong>Case Resolved</strong>
            <span>Immigration · Yesterday</span>
          </div>
          <div className="hero-badge">
            <span className="hb-num">4.9</span>
            <span>★★★★★</span>
            <small>Average Rating</small>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container">
          {STATS.map((s, i) => (
            <div key={i} className="stat-item">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <div className="container">
          <span className="eyebrow">What We Offer</span>
          <h2 className="section-title">Our Practice Areas</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card card">
                <span className="svc-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link to="/services" className="svc-link">Learn More →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LAWYERS */}
      <section className="section lawyers-section">
        <div className="container">
          <span className="eyebrow">Our Team</span>
          <h2 className="section-title">Featured Lawyers</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="grid-3">
            {LAWYERS.slice(0, 3).map(l => <LawyerCard key={l.id} lawyer={l} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/lawyers" className="btn-dark">View All Lawyers</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-section">
        <div className="container">
          <span className="eyebrow">Process</span>
          <h2 className="section-title">How It Works</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="steps">
            {[
              { num: "01", title: "Create an Account", desc: "Sign up in under 2 minutes. Your data is secure and confidential." },
              { num: "02", title: "Browse Lawyers", desc: "Filter by specialization, location, experience, and availability." },
              { num: "03", title: "Book a Consultation", desc: "Pick a time, describe your case, and confirm your booking." },
              { num: "04", title: "Get Legal Help", desc: "Meet your lawyer, track your case, and achieve results." },
            ].map((s, i) => (
              <div key={i} className="step">
                <span className="step-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section testimonials-section">
        <div className="container">
          <span className="eyebrow">Client Stories</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card card">
                <div className="t-stars">{"★".repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <div className="t-author">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container">
          <h2>Ready to Resolve Your Legal Matter?</h2>
          <p>Join thousands of Nigerians who trust LexConsult for expert legal guidance.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/contact" className="btn-secondary">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
