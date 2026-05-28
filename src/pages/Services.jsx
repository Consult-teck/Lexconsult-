import { Link } from "react-router-dom";

const services = [
  {
    icon: "🏢", title: "Corporate Law", price: "From ₦25,000",
    desc: "Comprehensive legal support for businesses at every stage of growth.",
    items: ["Company registration & incorporation", "Mergers and acquisitions", "Contract drafting and review", "Corporate governance", "Shareholder disputes", "Regulatory compliance"],
  },
  {
    icon: "⚖️", title: "Criminal Defense", price: "From ₦20,000",
    desc: "Vigorous representation for individuals facing criminal accusations.",
    items: ["Bail applications", "Trial representation", "Appeals and reviews", "Fraud & financial crimes", "Drug offenses", "Human rights violations"],
  },
  {
    icon: "👨‍👩‍👧", title: "Family Law", price: "From ₦15,000",
    desc: "Compassionate guidance through life's most sensitive legal matters.",
    items: ["Divorce proceedings", "Child custody & maintenance", "Adoption processes", "Prenuptial agreements", "Domestic violence orders", "Estate & inheritance"],
  },
  {
    icon: "🏠", title: "Real Estate & Property", price: "From ₦30,000",
    desc: "Protecting your property interests across all transactions.",
    items: ["Property conveyancing", "Title documentation", "Land dispute resolution", "Lease agreements", "Mortgage advisory", "Survey & planning permits"],
  },
  {
    icon: "✈️", title: "Immigration", price: "From ₦18,000",
    desc: "Expert assistance navigating Nigerian and international immigration law.",
    items: ["Visa applications & renewals", "Work permits", "Citizenship by naturalization", "Deportation defense", "Business entry permits", "Family reunification"],
  },
  {
    icon: "💡", title: "Intellectual Property", price: "From ₦22,000",
    desc: "Safeguarding your creative and business assets.",
    items: ["Trademark registration", "Patent filing", "Copyright protection", "IP litigation & enforcement", "Brand protection strategy", "Licensing agreements"],
  },
];

const process = [
  { num: "01", title: "Consult", desc: "Book an initial consultation to discuss your legal issue." },
  { num: "02", title: "Assess", desc: "Your lawyer reviews the matter and outlines your options." },
  { num: "03", title: "Strategize", desc: "A tailored legal strategy is prepared for your case." },
  { num: "04", title: "Execute", desc: "We represent and guide you until resolution." },
];

export default function Services() {
  return (
    <div>
      <div className="page-hero">
        <h1>Our Services</h1>
        <div className="gold-line"></div>
        <p>Comprehensive legal services across all major practice areas.</p>
      </div>

      {/* Services Grid */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container">
          <div className="grid-3">
            {services.map(s => (
              <div key={s.title} className="card" style={{ padding: 28, display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "2.2rem", display: "block", marginBottom: 14 }}>{s.icon}</span>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "var(--navy)", marginBottom: 8, fontSize: "1.05rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.6 }}>{s.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 20, flex: 1 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ fontSize: "0.84rem", color: "var(--text-secondary)", padding: "7px 0", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>◆</span>{item}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                  <strong style={{ color: "var(--gold-dark)", fontSize: "0.9rem" }}>{s.price}</strong>
                  <Link to="/lawyers" className="btn-secondary" style={{ fontSize: "0.78rem", padding: "7px 14px" }}>Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: "var(--navy)" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>How We Work</span>
          <h2 className="section-title" style={{ color: "white", marginTop: 8 }}>Our Process</h2>
          <div className="gold-line" style={{ margin: "0 0 48px" }}></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {process.map((p, i) => (
              <div key={p.num} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: 10, padding: 28, position: "relative" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.8rem", fontWeight: 900, color: "rgba(201,168,76,0.2)", display: "block", marginBottom: 8 }}>{p.num}</span>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "var(--gold)", marginBottom: 10, fontSize: "0.95rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{p.desc}</p>
                {i < process.length - 1 && (
                  <span style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", color: "var(--gold)", opacity: 0.4, fontSize: "1.2rem" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--cream)" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <span className="eyebrow" style={{ color: "var(--gold-dark)" }}>FAQ</span>
          <h2 className="section-title" style={{ marginTop: 8 }}>Common Questions</h2>
          <div className="gold-line" style={{ margin: "0 0 40px" }}></div>
          {[
            ["How do I book a consultation?", "Browse our lawyers, select one that suits your need, click 'Book Now', fill in your details, and confirm. You'll hear back within a few hours."],
            ["Are consultations confidential?", "Absolutely. All consultations are protected by attorney-client privilege and our strict privacy policy."],
            ["How do I pay?", "Payment is arranged directly with your lawyer before the consultation. We support bank transfers and major payment methods."],
            ["Can I change or cancel a booking?", "Yes. You can cancel from your dashboard before the appointment time."],
          ].map(([q, a]) => (
            <div key={q} style={{ borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
              <strong style={{ display: "block", color: "var(--navy)", marginBottom: 8, fontSize: "0.95rem" }}>Q: {q}</strong>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
