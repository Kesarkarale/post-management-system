import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, 2500);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const bg =
    type === "error"
      ? "linear-gradient(135deg,#ef4444,#b91c1c)"
      : "linear-gradient(135deg,#0891b2,#14b8a6)";

  return (
    <div
      style={{
        position: "fixed",
        top: 90,
        right: 30,
        zIndex: 200,
        background: bg,
        color: "#fff",
        padding: "14px 20px",
        borderRadius: 14,
        fontWeight: 900,
        boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        fontFamily: "Inter, Arial, sans-serif"
      }}
    >
      {message}
    </div>
  );
}
