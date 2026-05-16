import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });

  const [message, setMessage] = useState({
    type: location.state?.successMessage ? "success" : "",
    text: location.state?.successMessage || ""
  });

  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);

    setTimeout(() => {
      const result = login(form.email, form.password);

      if (!result.success) {
        setMessage({ type: "error", text: result.message });
        setLoading(false);
        return;
      }

      setMessage({ type: "success", text: "Login successful. Redirecting..." });

      setTimeout(() => {
        navigate("/");
      }, 900);
    }, 700);
  }

  const s = {
    page: {
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 24,
      background:
        "radial-gradient(circle at 15% 20%, rgba(34,211,238,.18), transparent 28%), radial-gradient(circle at 85% 80%, rgba(20,184,166,.16), transparent 32%), #020617",
      fontFamily: "Inter, Arial, sans-serif"
    },
    card: {
      width: "min(470px,100%)",
      padding: 38,
      borderRadius: 26,
      background: "rgba(15,23,42,.86)",
      border: "1px solid rgba(148,163,184,.18)",
      boxShadow: "0 28px 80px rgba(0,0,0,.48)",
      backdropFilter: "blur(18px)",
      animation: "fadeIn .6s ease"
    },
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(25px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `,
    eyebrow: { color: "#22d3ee", letterSpacing: 2, fontWeight: 900 },
    h1: { color: "#f8fafc", fontSize: 38, margin: "8px 0" },
    text: { color: "#94a3b8", lineHeight: 1.7 },
    form: { display: "grid", gap: 15, marginTop: 24 },
    input: {
      padding: "15px 16px",
      borderRadius: 13,
      border: "1px solid rgba(148,163,184,.16)",
      background: "rgba(2,6,23,.55)",
      color: "#fff",
      outline: "none"
    },
    btn: {
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "14px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      border: "none",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10
    },
    loader: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: "3px solid rgba(255,255,255,.35)",
      borderTop: "3px solid #fff",
      animation: "spin .8s linear infinite"
    },
    msg: {
      padding: 13,
      borderRadius: 13,
      marginTop: 16,
      fontWeight: 800
    },
    error: {
      background: "rgba(127,29,29,.28)",
      color: "#fecaca",
      border: "1px solid rgba(248,113,113,.28)"
    },
    success: {
      background: "rgba(20,184,166,.14)",
      color: "#99f6e4",
      border: "1px solid rgba(45,212,191,.28)"
    },
    switch: { color: "#94a3b8", textAlign: "center", marginTop: 20 },
    link: { color: "#22d3ee", fontWeight: 900 }
  };

  return (
    <section style={s.page}>
      <style>{s.keyframes}</style>

      <div style={s.card}>
        <p style={s.eyebrow}>WELCOME BACK</p>
        <h1 style={s.h1}>Login to PostPilot</h1>
        <p style={s.text}>Login with your registered email and password.</p>

        {message.text && (
          <div style={{ ...s.msg, ...(message.type === "success" ? s.success : s.error) }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={s.form}>
          <input
            style={s.input}
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            style={s.input}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button style={s.btn} disabled={loading}>
            {loading && <span style={s.loader}></span>}
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p style={s.switch}>
          Don&apos;t have an account? <Link style={s.link} to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}
