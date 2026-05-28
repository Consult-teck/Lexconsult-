import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚖</span>
          <div>
            <span className="logo-name">LexConsult</span>
            <span className="logo-tagline">Legal Excellence</span>
          </div>
        </Link>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className={open ? "x" : ""}></span>
          <span className={open ? "x" : ""}></span>
          <span className={open ? "x" : ""}></span>
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>About</Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""}>Services</Link>
          <Link to="/lawyers" className={isActive("/lawyers") ? "active" : ""}>Lawyers</Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard" className={`nav-link-btn ${isActive("/dashboard") ? "active" : ""}`}>Dashboard</Link>
              {user.role === "admin" && (
                <Link to="/admin" className={isActive("/admin") ? "active" : ""}>Admin</Link>
              )}
              <div className="nav-user">
                <Link to="/profile" className="user-avatar">{user.avatar}</Link>
                <div className="user-dropdown">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/cases">My Cases</Link>
                  <button onClick={handleLogout}>Sign Out</button>
                </div>
              </div>
            </>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn-ghost">Login</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
