import { Link } from "react-router-dom";
import "./LawyerCard.css";

export default function LawyerCard({ lawyer }) {
  const stars = "★".repeat(Math.floor(lawyer.rating)) + (lawyer.rating % 1 ? "½" : "");

  return (
    <div className="lawyer-card card">
      <div className="lc-header">
        <div className="lc-avatar">{lawyer.avatar}</div>
        <div>
          <h3>{lawyer.name}</h3>
          <span className="badge badge-gold">{lawyer.specialization}</span>
        </div>
        <div className={`lc-status ${lawyer.available ? "avail" : "busy"}`}>
          {lawyer.available ? "Available" : "Busy"}
        </div>
      </div>

      <p className="lc-bio">{lawyer.bio}</p>

      <div className="lc-meta">
        <div className="lc-stat">
          <span className="stat-label">Experience</span>
          <span className="stat-value">{lawyer.experience} yrs</span>
        </div>
        <div className="lc-stat">
          <span className="stat-label">Location</span>
          <span className="stat-value">{lawyer.location}</span>
        </div>
        <div className="lc-stat">
          <span className="stat-label">Consultation</span>
          <span className="stat-value">₦{lawyer.fee.toLocaleString()}</span>
        </div>
      </div>

      <div className="lc-rating">
        <span className="stars">{stars}</span>
        <span className="rating-num">{lawyer.rating}</span>
        <span className="review-count">({lawyer.reviews} reviews)</span>
      </div>

      <div className="lc-footer">
        <span className="lc-langs">🌐 {lawyer.languages.join(", ")}</span>
        {lawyer.available ? (
          <Link to={`/book/${lawyer.id}`} className="btn-primary" style={{ fontSize: "0.8rem", padding: "9px 18px" }}>
            Book Now
          </Link>
        ) : (
          <button className="btn-primary" disabled style={{ opacity: 0.4, fontSize: "0.8rem", padding: "9px 18px" }}>
            Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
