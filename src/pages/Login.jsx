import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import "./Auth.css";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast, ToastComponent } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try {
        login(form.email, form.password);
        navigate("/dashboard");
      } catch (err) {
        showToast(err.message, "error");
        setLoading(false);
      }
    }, 800);
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
          "Justice delayed is justice denied. Let us help you access justice without delay."
        </blockquote>
        <div className="auth-demo">
          <p>Demo credentials:</p>
          <code>admin@lexconsult.com / admin123</code>
          <code>emeka@gmail.com / user123</code>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p>Sign in to access your consultations and cases.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="input-wrap">
                <input type={show ? "text" : "password"} placeholder="Your password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
                <button type="button" className="show-btn" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
              </div>
            </div>
            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}

export default Login;
