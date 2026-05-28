import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span>⚖</span>
            <div>
              <strong>LexConsult</strong>
              <small>Legal Excellence</small>
            </div>
          </div>
          <p>Connecting Nigerians with trusted legal professionals for every need — corporate, criminal, family, and beyond.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Facebook">f</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/lawyers">Find a Lawyer</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Practice Areas</h4>
          <span>Corporate Law</span>
          <span>Criminal Defense</span>
          <span>Family Law</span>
          <span>Real Estate</span>
          <span>Immigration</span>
          <span>Intellectual Property</span>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <span>📍 LEAD CITY UNIVERSITY</span>
          <span>📞 +234 800 LEX CONSULT</span>
          <span>✉️ info@lexconsult.com</span>
          <span>🕐 Mon–Fri: 8am – 6pm</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} LexConsult. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
