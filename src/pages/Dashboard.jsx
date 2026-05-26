import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [posts] = useLocalStorage("posts");
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);

  const authors = new Set(posts.map((p) => p.author));
  const tags = new Set(posts.flatMap((p) => p.tags));
  const latest = posts[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const animations = `
    @keyframes fadeUp{
      from{
        opacity:0;
        transform:translateY(30px);
      }
      to{
        opacity:1;
        transform:translateY(0);
      }
    }

    @keyframes pulse{
      0%{
        transform:scale(1);
      }
      50%{
        transform:scale(1.05);
      }
      100%{
        transform:scale(1);
      }
    }
  `;

  const s = {
    page: {
      minHeight: "100vh",
      background:
        "radial-gradient(circle at top left, rgba(34,211,238,.12), transparent 28%), #020617",
      fontFamily: "Inter, Arial, sans-serif",
      color: "#e2e8f0",
      overflow: "hidden",
      position: "relative"
    },

    wrap: {
      width: "min(1180px,92%)",
      margin: "auto",
      padding: "34px 0",
      position: "relative",
      zIndex: 2
    },

    hero: {
      padding: 46,
      borderRadius: 26,
      marginBottom: 24,
      background:
        "linear-gradient(135deg,rgba(8,145,178,.18),rgba(20,184,166,.10)),rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      boxShadow: "0 25px 55px rgba(0,0,0,.28)",
      animation: "fadeUp .7s ease"
    },

    eyebrow: {
      color: "#22d3ee",
      letterSpacing: 2,
      fontWeight: 900,
      margin: 0
    },

    h1: {
      fontSize: 52,
      color: "#f8fafc",
      margin: "12px 0"
    },

    text: {
      color: "#94a3b8",
      lineHeight: 1.7,
      maxWidth: 720
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
      gap: 18,
      marginBottom: 24
    },

    card: {
      background: "rgba(15,23,42,.80)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 24,
      boxShadow: "0 22px 45px rgba(0,0,0,.25)",
      transition: ".3s",
      cursor: "pointer",
      backdropFilter: "blur(10px)"
    },

    icon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      display: "grid",
      placeItems: "center",
      background: "rgba(34,211,238,.12)",
      color: "#22d3ee",
      fontSize: 22,
      marginBottom: 14,
      animation: "pulse 2s infinite"
    },

    num: {
      fontSize: 36,
      color: "#f8fafc",
      margin: 0
    },

    label: {
      color: "#94a3b8",
      fontWeight: 800,
      margin: "6px 0 0"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: 22
    },

    panel: {
      background: "rgba(15,23,42,.80)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 26,
      boxShadow: "0 22px 45px rgba(0,0,0,.25)",
      transition: ".3s",
      backdropFilter: "blur(10px)"
    },

    h2: {
      color: "#f8fafc",
      marginTop: 0
    },

    action: {
      display: "block",
      padding: 16,
      borderRadius: 15,
      background: "rgba(2,6,23,.48)",
      color: "#e2e8f0",
      border: "1px solid rgba(148,163,184,.12)",
      fontWeight: 900,
      textDecoration: "none",
      marginBottom: 14,
      transition: ".25s"
    },

    primary: {
      display: "inline-block",
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "12px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      textDecoration: "none",
      marginTop: 10,
      transition: ".25s"
    },

    activity: {
      display: "grid",
      gap: 12,
      marginTop: 18
    },

    activityItem: {
      padding: 14,
      borderRadius: 14,
      background: "rgba(2,6,23,.45)",
      border: "1px solid rgba(148,163,184,.10)",
      color: "#94a3b8"
    },

    barWrap: {
      height: 220,
      borderRadius: 18,
      background:
        "linear-gradient(180deg,rgba(34,211,238,.20),rgba(15,23,42,.20))",
      padding: 18,
      display: "flex",
      alignItems: "end",
      gap: 12
    },

    bar: {
      flex: 1,
      borderRadius: 999,
      background: "linear-gradient(180deg,#22d3ee,#0f766e)",
      transition: ".3s"
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <style>{animations}</style>

      <main style={s.page}>
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(34,211,238,.08)",
            filter: "blur(120px)",
            top: -150,
            left: -150
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 450,
            height: 450,
            borderRadius: "50%",
            background: "rgba(20,184,166,.08)",
            filter: "blur(120px)",
            bottom: -150,
            right: -150
          }}
        />

        <div style={s.wrap}>
          <section style={s.hero}>
            <p style={s.eyebrow}>DASHBOARD</p>

            <h1 style={s.h1}>
              Hello, {user?.name || "User"}
            </h1>

            <p style={s.text}>
              Welcome to your professional post management system.
              Manage posts, authors, tags and content activity
              from one clean dashboard.
            </p>
          </section>

          <section style={s.stats}>
            <div
              style={s.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(34,211,238,.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 22px 45px rgba(0,0,0,.25)";
              }}
            >
              <div style={s.icon}>📝</div>
              <h3 style={s.num}>{posts.length}</h3>
              <p style={s.label}>Total Posts</p>
            </div>

            <div
              style={s.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(34,211,238,.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 22px 45px rgba(0,0,0,.25)";
              }}
            >
              <div style={s.icon}>👤</div>
              <h3 style={s.num}>{authors.size}</h3>
              <p style={s.label}>Authors</p>
            </div>

            <div
              style={s.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(34,211,238,.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 22px 45px rgba(0,0,0,.25)";
              }}
            >
              <div style={s.icon}>🏷️</div>
              <h3 style={s.num}>{tags.size}</h3>
              <p style={s.label}>Tags</p>
            </div>

            <div
              style={s.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 30px 60px rgba(34,211,238,.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 22px 45px rgba(0,0,0,.25)";
              }}
            >
              <div style={s.icon}>⚡</div>
              <h3 style={s.num}>
                {latest ? "Active" : "Empty"}
              </h3>
              <p style={s.label}>Project Status</p>
            </div>
          </section>

          <section style={s.grid}>
            <div
              style={s.panel}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <h2 style={s.h2}>Quick Actions</h2>

              <Link
                style={s.action}
                to="/posts/new"
              >
                ➕ Create New Post
              </Link>

              <Link
                style={s.action}
                to="/posts"
              >
                📚 Manage Posts
              </Link>

              <Link
                style={s.action}
                to="/posts"
              >
                🔎 Search Content
              </Link>
            </div>

            <div
              style={s.panel}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <h2 style={s.h2}>Latest Post</h2>

              {latest ? (
                <>
                  <h3 style={{ color: "#f8fafc" }}>
                    {latest.title}
                  </h3>

                  <p style={s.text}>
                    {latest.content.slice(0, 150)}...
                  </p>

                  <Link
                    style={s.primary}
                    to={`/posts/${latest.id}`}
                  >
                    View Latest Post
                  </Link>
                </>
              ) : (
                <p style={s.text}>
                  No posts available yet.
                  Create your first post.
                </p>
              )}
            </div>

            <div
              style={s.panel}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <h2 style={s.h2}>Recent Activity</h2>

              <div style={s.activity}>
                <div style={s.activityItem}>
                  ✅ Dashboard opened successfully
                </div>

                <div style={s.activityItem}>
                  📚 Posts loaded from localStorage
                </div>

                <div style={s.activityItem}>
                  🔐 User authenticated
                </div>

                <div style={s.activityItem}>
                  🚀 Project ready for deployment
                </div>
              </div>
            </div>

            <div
              style={s.panel}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "translateY(0px)";
              }}
            >
              <h2 style={s.h2}>Content Analytics</h2>

              <div style={s.barWrap}>
                {[45, 70, 55, 85, 60, 95, 75].map(
                  (h, i) => (
                    <div
                      key={i}
                      style={{
                        ...s.bar,
                        height: `${h}%`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = ".8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
