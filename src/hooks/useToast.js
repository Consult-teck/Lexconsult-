import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const ToastComponent = toast ? (
    <div className={`toast toast-${toast.type}`} style={{ borderLeftColor: toast.type === "error" ? "var(--danger)" : toast.type === "success" ? "var(--success)" : "var(--gold)" }}>
      {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}
      {toast.message}
    </div>
  ) : null;

  return { showToast, ToastComponent };
}
