 import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const s = {
    page: {
      minHeight: "100vh",
      padding: "40px 7%",
      background: "#020617",
      fontFamily: "Inter, Arial, sans-serif"
    },

    card: {
      maxWidth: 650,
      margin: "auto",
      background: "rgba(15,23,42,.82)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 28,
      padding: 34,
      boxShadow: "0 25px 55px rgba(0,0,0,.32)"
    },

    avatar: {
      width: 110,
      height: 110,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      fontSize: 42,
      fontWeight: 900,
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      color: "#fff",
      marginBottom: 24
    },

    h1: {
      color: "#fff",
      marginBottom: 8
    },

    text: {
      color: "#94a3b8",
      lineHeight: 1.7
    },

    grid: {
      display: "grid",
      gap: 18,
      marginTop: 28
    },

    item: {
      padding: 18,
      borderRadius: 18,
      background: "rgba(2,6,23,.55)",
      border: "1px solid rgba(148,163,184,.10)"
    },

    label: {
      color: "#64748b",
      fontSize: 13,
      marginBottom: 6
    },

    value: {
      color: "#fff",
      fontWeight: 800
    }
  };

  return (
    <main style={s.page}>
      <section style={s.card}>
        <div style={s.avatar}>
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>

        <h1 style={s.h1}>{user?.name}</h1>

        <p style={s.text}>
          Manage your profile and account information.
        </p>

        <div style={s.grid}>
          <div style={s.item}>
            <div style={s.label}>Full Name</div>
            <div style={s.value}>{user?.name}</div>
          </div>

          <div style={s.item}>
            <div style={s.label}>Email Address</div>
            <div style={s.value}>{user?.email}</div>
          </div>

          <div style={s.item}>
            <div style={s.label}>Account Status</div>
            <div style={s.value}>Active</div>
          </div>
        </div>
      </section>
    </main>
  );
}
