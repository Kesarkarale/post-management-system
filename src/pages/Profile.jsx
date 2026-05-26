import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontFamily: "Inter"
      }}
    >
      <div
        style={{
          width: 420,
          padding: 40,
          borderRadius: 30,
          background: "rgba(15,23,42,.9)",
          border:
            "1px solid rgba(148,163,184,.12)"
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            margin: "auto",
            display: "grid",
            placeItems: "center",
            fontSize: 40,
            fontWeight: 900,
            background:
              "linear-gradient(135deg,#0891b2,#14b8a6)"
          }}
        >
          {user?.name?.charAt(0)}
        </div>

        <h1
          style={{
            textAlign: "center",
            marginTop: 20
          }}
        >
          {user?.name}
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8"
          }}
        >
          {user?.email}
        </p>

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gap: 14
          }}
        >
          <div
            style={{
              padding: 18,
              borderRadius: 16,
              background: "rgba(2,6,23,.5)"
            }}
          >
            🔐 Account Secure
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              background: "rgba(2,6,23,.5)"
            }}
          >
            🚀 Premium Dashboard User
          </div>

          <div
            style={{
              padding: 18,
              borderRadius: 16,
              background: "rgba(2,6,23,.5)"
            }}
          >
            ⚡ Active Status
          </div>
        </div>
      </div>
    </main>
  );
}
