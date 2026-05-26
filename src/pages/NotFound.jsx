import { Link } from "react-router-dom";

export default function NotFound() {
  const s = {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background:
        "radial-gradient(circle at top left, rgba(34,211,238,.12), transparent 28%), #020617",
      padding: 20,
      fontFamily: "Inter, Arial, sans-serif"
    },

    card: {
      width: "min(650px,100%)",
      padding: 40,
      borderRadius: 28,
      background: "rgba(15,23,42,.82)",
      border: "1px solid rgba(148,163,184,.14)",
      textAlign: "center",
      boxShadow: "0 25px 55px rgba(0,0,0,.32)"
    },

    code: {
      fontSize: 120,
      fontWeight: 900,
      margin: 0,
      background: "linear-gradient(135deg,#22d3ee,#14b8a6)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    },

    h1: {
      color: "#fff",
      marginTop: 10
    },

    text: {
      color: "#94a3b8",
      lineHeight: 1.7,
      maxWidth: 500,
      margin: "auto"
    },

    btn: {
      display: "inline-block",
      marginTop: 28,
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "14px 22px",
      borderRadius: 14,
      color: "#fff",
      textDecoration: "none",
      fontWeight: 900
    }
  };

  return (
    <main style={s.page}>
      <section style={s.card}>
        <h1 style={s.code}>404</h1>

        <h2 style={s.h1}>Page Not Found</h2>

        <p style={s.text}>
          The page you are looking for does not exist or may have been removed.
        </p>

        <Link style={s.btn} to="/">
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}
