import { Link } from "react-router-dom";

export default function NotFound() {
  const s = {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 24,
      background: "#020617",
      fontFamily: "Inter, Arial, sans-serif"
    },
    box: {
      textAlign: "center",
      background: "rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 40,
      color: "#94a3b8"
    },
    h1: { fontSize: 70, color: "#22d3ee", margin: 0 },
    btn: {
      display: "inline-block",
      marginTop: 18,
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "12px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      textDecoration: "none"
    }
  };

  return (
    <main style={s.page}>
      <section style={s.box}>
        <h1 style={s.h1}>404</h1>
        <p>Page not found.</p>
        <Link style={s.btn} to="/">Go Home</Link>
      </section>
    </main>
  );
}
