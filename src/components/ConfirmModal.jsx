export default function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel
}) {
  if (!open) return null;

  const s = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(2,6,23,.72)",
      backdropFilter: "blur(8px)",
      display: "grid",
      placeItems: "center",
      zIndex: 100
    },

    modal: {
      width: "min(420px,92%)",
      background: "rgba(15,23,42,.95)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 24,
      padding: 28,
      boxShadow: "0 25px 55px rgba(0,0,0,.45)",
      fontFamily: "Inter, Arial, sans-serif"
    },

    h2: {
      marginTop: 0,
      color: "#fff"
    },

    p: {
      color: "#94a3b8",
      lineHeight: 1.7
    },

    actions: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 24
    },

    cancel: {
      border: "1px solid rgba(148,163,184,.16)",
      background: "rgba(15,23,42,.72)",
      color: "#e2e8f0",
      padding: "12px 16px",
      borderRadius: 12,
      cursor: "pointer",
      fontWeight: 900
    },

    delete: {
      border: "none",
      background: "linear-gradient(135deg,#ef4444,#b91c1c)",
      color: "#fff",
      padding: "12px 16px",
      borderRadius: 12,
      cursor: "pointer",
      fontWeight: 900
    }
  };

  return (
    <div style={s.overlay}>
      <div style={s.modal}>
        <h2 style={s.h2}>{title}</h2>

        <p style={s.p}>{message}</p>

        <div style={s.actions}>
          <button style={s.cancel} onClick={onCancel}>
            Cancel
          </button>

          <button style={s.delete} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
