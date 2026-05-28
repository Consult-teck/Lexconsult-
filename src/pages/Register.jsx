import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import "./Auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { showToast("Passwords do not match.", "error"); return; }
    if (form.password.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }
    setLoading(true);
    setTimeout(() => {
      try {
        register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
        navigate("/dashboard");
      } catch (err) {
        showToast(err.message, "error");
        setLoading(false);
      }
    }, 900);
  };

  return (
    <div className="auth-page">
      <div className="auth-side">
        <div className="auth-brand">
          <span>⚖</span>
          <div>
            <strong>LexConsult</strong>
            <small>Legal Excellence</small>
          </div>
        </div>
        <blockquote>
          "Access to justice is a fundamental right. We make it accessible to every Nigerian."
        </blockquote>
        <ul className="auth-perks">
          <li>✓ Verified, experienced lawyers</li>
          <li>✓ Secure and confidential</li>
          <li>✓ Book in minutes</li>
          <li>✓ Track your cases</li>
        </ul>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Join thousands of Nigerians accessing quality legal help.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Chukwuemeka Obi" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="08012345678" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} required />
              </div>
            </div>
            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}
