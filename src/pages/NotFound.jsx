import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--navy)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "100px 24px",
    }}>
      <div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(6rem, 20vw, 12rem)",
          color: "rgba(201,168,76,0.12)",
          lineHeight: 1,
          fontWeight: 900,
          userSelect: "none",
        }}>
          404
        </div>
        <h2 style={{ color: "white", fontSize: "clamp(1.4rem, 3vw, 2rem)", margin: "-20px 0 12px" }}>
          Page Not Found
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 36, fontSize: "1rem", maxWidth: 400, margin: "0 auto 36px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/lawyers" className="btn-secondary" style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}>
            Find a Lawyer
          </Link>
        </div>
      </div>
    </div>
  );
}
