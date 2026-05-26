import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { dark, setDark } = useTheme();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        padding: "60px 7%",
        fontFamily: "Inter"
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "auto",
          padding: 40,
          borderRadius: 30,
          background: "rgba(15,23,42,.9)",
          border:
            "1px solid rgba(148,163,184,.12)"
        }}
      >
        <h1>Settings</h1>

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gap: 20
          }}
        >
          <div
            style={{
              padding: 20,
              borderRadius: 18,
              background: "rgba(2,6,23,.5)"
            }}
          >
            <h3>Theme Mode</h3>

            <button
              onClick={() => setDark(!dark)}
              style={{
                marginTop: 10,
                border: "none",
                padding: "14px 20px",
                borderRadius: 12,
                cursor: "pointer",
                background:
                  "linear-gradient(135deg,#0891b2,#14b8a6)",
                color: "#fff",
                fontWeight: 800
              }}
            >
              {dark
                ? "Switch to Light"
                : "Switch to Dark"}
            </button>
          </div>

          <div
            style={{
              padding: 20,
              borderRadius: 18,
              background: "rgba(2,6,23,.5)"
            }}
          >
            🔐 Security Enabled
          </div>

          <div
            style={{
              padding: 20,
              borderRadius: 18,
              background: "rgba(2,6,23,.5)"
            }}
          >
            🚀 Professional Plan Active
          </div>
        </div>
      </div>
    </main>
  );
}
