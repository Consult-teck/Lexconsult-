import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserCases, saveCase, updateCase, addCaseUpdate, getCases } from "../data/store";
import { useToast } from "../hooks/useToast";
import "./CaseManagement.css";

const CATEGORIES = ["Corporate Law", "Criminal Defense", "Family Law", "Real Estate", "Immigration", "Intellectual Property", "Other"];

export default function CaseManagement() {
  const { user } = useAuth();
  const { showToast, ToastComponent } = useToast();
  const [cases, setCases] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [form, setForm] = useState({ title: "", category: "", description: "", priority: "medium" });
  const [loading, setLoading] = useState(false);

  const refresh = () => setCases(getUserCases(user.id));
  useEffect(() => { refresh(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.description) {
      showToast("Please fill all fields.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      saveCase({ ...form, userId: user.id, userName: user.name });
      refresh();
      setForm({ title: "", category: "", description: "", priority: "medium" });
      setShowForm(false);
      setLoading(false);
      showToast("Case opened successfully!", "success");
    }, 800);
  };

  const addNote = (caseId) => {
    if (!newNote.trim()) return;
    addCaseUpdate(caseId, newNote, user.name);
    refresh();
    setNewNote("");
    const updated = getCases().find(c => c.id === caseId);
    setSelected(updated);
    showToast("Update added.", "success");
  };

  const closeCase = (id) => {
    updateCase(id, { status: "closed" });
    refresh();
    setSelected(null);
    showToast("Case closed.", "info");
  };

  const priorityColor = (p) => ({ high: "badge-danger", medium: "badge-gold", low: "badge-success" }[p] || "badge-navy");
  const statusColor = (s) => ({ open: "badge-success", in_progress: "badge-gold", closed: "badge-navy" }[s] || "badge-navy");

  return (
    <div className="case-page">
      <div className="dash-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1>Case Management</h1>
            <p>Track and manage your legal cases and their updates.</p>
          </div>
          <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? "✕ Cancel" : "+ Open New Case"}
          </button>
        </div>
      </div>

      <div className="section container">
        {/* New Case Form */}
        {showForm && (
          <div className="new-case-form card">
            <h3>Open a New Case</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label>Case Title *</label>
                  <input type="text" placeholder="e.g. Business Contract Dispute" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="">Select category</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Case Description *</label>
                <textarea placeholder="Describe your legal situation in detail. Include relevant facts, dates, and parties involved..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={5}></textarea>
              </div>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Opening Case..." : "Submit Case"}
              </button>
            </form>
          </div>
        )}

        <div className="case-layout">
          {/* Case List */}
          <div className="case-list">
            <h3 style={{ marginBottom: 16, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
              All Cases ({cases.length})
            </h3>
            {cases.length === 0 ? (
              <div className="empty-state" style={{ padding: "40px 20px" }}>
                <span>📋</span>
                <h3>No cases yet</h3>
                <p>Click "Open New Case" to get started.</p>
              </div>
            ) : (
              cases.map(c => (
                <div
                  key={c.id}
                  className={`case-list-item card ${selected?.id === c.id ? "selected" : ""}`}
                  onClick={() => setSelected(c)}
                >
                  <div className="cli-top">
                    <strong>{c.title}</strong>
                    <span className={`badge ${statusColor(c.status)}`}>{c.status.replace("_", " ")}</span>
                  </div>
                  <div className="cli-meta">
                    <span className={`badge ${priorityColor(c.priority)}`}>{c.priority} priority</span>
                    <span className="cli-cat">{c.category}</span>
                    <span className="cli-date">{new Date(c.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Case Detail */}
          {selected ? (
            <div className="case-detail card">
              <div className="cd-header">
                <div>
                  <h2>{selected.title}</h2>
                  <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                    <span className={`badge ${statusColor(selected.status)}`}>{selected.status.replace("_", " ")}</span>
                    <span className={`badge ${priorityColor(selected.priority)}`}>{selected.priority} priority</span>
                    <span className="badge badge-navy">{selected.category}</span>
                  </div>
                </div>
                {selected.status !== "closed" && (
                  <button className="btn-danger" onClick={() => closeCase(selected.id)}>Close Case</button>
                )}
              </div>

              <div className="divider"></div>
              <h4>Case Description</h4>
              <p className="cd-desc">{selected.description}</p>

              <div className="divider"></div>
              <h4>Case Updates ({selected.updates?.length || 0})</h4>
              <div className="updates-list">
                {selected.updates?.map((u, i) => (
                  <div key={i} className="update-item">
                    <div className="update-dot"></div>
                    <div>
                      <p>{u.note}</p>
                      <span>{u.by} · {new Date(u.date).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                  </div>
                ))}
              </div>

              {selected.status !== "closed" && (
                <div className="add-update">
                  <textarea
                    placeholder="Add a case update or note..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    rows={3}
                  ></textarea>
                  <button className="btn-dark" onClick={() => addNote(selected.id)}>Add Update</button>
                </div>
              )}
            </div>
          ) : (
            <div className="case-detail-empty">
              <span>👆</span>
              <p>Select a case to view details and updates.</p>
            </div>
          )}
        </div>
      </div>
      {ToastComponent}
    </div>
  );
}
