import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [posts] = useLocalStorage("posts");
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const [sidebar, setSidebar] = useState(true);
  const [notify, setNotify] = useState(false);

  const authors = new Set(posts.map((p) => p.author));
  const tags = new Set(posts.flatMap((p) => p.tags));
  const latest = posts[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(clock);
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

    glow1: {
      position: "absolute",
      width: 500,
      height: 500,
      borderRadius: "50%",
      background: "rgba(34,211,238,.08)",
      filter: "blur(120px)",
      top: -150,
      left: -150
    },

    glow2: {
      position: "absolute",
      width: 450,
      height: 450,
      borderRadius: "50%",
      background: "rgba(20,184,166,.08)",
      filter: "blur(120px)",
      bottom: -150,
      right: -150
    },

    layout: {
      width: "min(1400px,95%)",
      margin: "auto",
      display: "grid",
      gridTemplateColumns: sidebar ? "280px 1fr" : "90px 1fr",
      gap: 24,
      padding: "30px 0",
      transition: ".3s"
    },

    sidebar: {
      background: "rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.12)",
      borderRadius: 26,
      padding: 24,
      height: "fit-content",
      position: "sticky",
      top: 100,
      boxShadow: "0 25px 55px rgba(0,0,0,.28)"
    },

    brand: {
      fontSize: 34,
      fontWeight: 900,
      marginBottom: 30,
      color: "#fff"
    },

    cyan: {
      color: "#22d3ee"
    },

    menu: {
      display: "grid",
      gap: 14
    },

    nav: {
      padding: 15,
      borderRadius: 15,
      background: "rgba(2,6,23,.45)",
      color: "#cbd5e1",
      textDecoration: "none",
      fontWeight: 800,
      transition: ".3s"
    },

    content: {
      display: "grid",
      gap: 24,
      position: "relative"
    },

    hero: {
      padding: 42,
      borderRadius: 28,
      background:
        "linear-gradient(135deg,rgba(8,145,178,.18),rgba(20,184,166,.10)),rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      animation: "fadeUp .7s ease",
      boxShadow: "0 25px 55px rgba(0,0,0,.28)"
    },

    title: {
      fontSize: 52,
      margin: "10px 0",
      color: "#fff"
    },

    text: {
      color: "#94a3b8",
      lineHeight: 1.7
    },

    clock: {
      marginTop: 24,
      display: "inline-block",
      padding: "12px 18px",
      borderRadius: 14,
      background: "rgba(2,6,23,.5)",
      border: "1px solid rgba(148,163,184,.14)",
      color: "#22d3ee",
      fontWeight: 900
    },

    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
      gap: 20
    },

    card: {
      padding: 24,
      borderRadius: 24,
      background: "rgba(15,23,42,.82)",
      border: "1px solid rgba(148,163,184,.12)",
      boxShadow: "0 22px 45px rgba(0,0,0,.25)",
      transition: ".3s",
      cursor: "pointer"
    },

    icon: {
      fontSize: 30,
      marginBottom: 14
    },

    num: {
      fontSize: 40,
      margin: 0,
      color: "#fff"
    },

    label: {
      color: "#94a3b8",
      fontWeight: 700
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
      gap: 22
    },

    panel: {
      padding: 26,
      borderRadius: 24,
      background: "rgba(15,23,42,.82)",
      border: "1px solid rgba(148,163,184,.12)",
      boxShadow: "0 22px 45px rgba(0,0,0,.25)"
    },

    h2: {
      color: "#fff",
      marginTop: 0
    },

    action: {
      display: "block",
      padding: 16,
      borderRadius: 14,
      marginBottom: 14,
      background: "rgba(2,6,23,.45)",
      color: "#fff",
      textDecoration: "none",
      fontWeight: 800,
      transition: ".3s"
    },

    progressWrap: {
      marginTop: 18
    },

    progressBar: {
      height: 14,
      borderRadius: 999,
      background: "rgba(255,255,255,.08)",
      overflow: "hidden"
    },

    fill: {
      width: "78%",
      height: "100%",
      background: "linear-gradient(90deg,#22d3ee,#14b8a6)"
    },

    users: {
      display: "grid",
      gap: 14,
      marginTop: 20
    },

    userCard: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: 14,
      borderRadius: 16,
      background: "rgba(2,6,23,.45)"
    },

    avatar: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      fontWeight: 900
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <style>{animations}</style>

      <main style={s.page}>
        <div style={s.glow1}></div>
        <div style={s.glow2}></div>

        <div style={s.layout}>
          <aside style={s.sidebar}>
            <div style={s.brand}>
              {sidebar ? (
                <>
                  Post<span style={s.cyan}>Pilot</span>
                </>
              ) : (
                "P"
              )}
            </div>

            <div style={s.menu}>
              <Link style={s.nav} to="/">
                {sidebar ? "🏠 Dashboard" : "🏠"}
              </Link>

              <Link style={s.nav} to="/posts">
                {sidebar ? "📚 Posts" : "📚"}
              </Link>

              <Link style={s.nav} to="/posts/new">
                {sidebar ? "➕ Create" : "➕"}
              </Link>

              <Link style={s.nav} to="/profile">
                {sidebar ? "👤 Profile" : "👤"}
              </Link>

              <Link style={s.nav} to="/settings">
               {sidebar ? "⚙️ Settings" : "⚙️"}
              </Link>
            </div>
          </aside>

          <section style={s.content}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap"
              }}
            >
              <button
                onClick={() => setSidebar(!sidebar)}
                style={{
                  border: "none",
                  background: "rgba(15,23,42,.8)",
                  color: "#fff",
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  cursor: "pointer",
                  fontSize: 22
                }}
              >
                ☰
              </button>

              <div
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center"
                }}
              >
                <button
                  onClick={() => setNotify(!notify)}
                  style={{
                    position: "relative",
                    border: "none",
                    background: "rgba(15,23,42,.8)",
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 20
                  }}
                >
                  🔔

                  <span
                    style={{
                      position: "absolute",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: "#22d3ee",
                      top: 10,
                      right: 10
                    }}
                  />
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(15,23,42,.8)",
                    padding: "10px 14px",
                    borderRadius: 14
                  }}
                >
                  <div style={s.avatar}>
                    {user?.name?.charAt(0)}
                  </div>

                  <div>
                    <div style={{ fontWeight: 800 }}>
                      {user?.name}
                    </div>

                    <div
                      style={{
                        color: "#94a3b8",
                        fontSize: 13
                      }}
                    >
                      Administrator
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {notify && (
              <div
                style={{
                  position: "absolute",
                  top: 90,
                  right: 0,
                  width: 320,
                  padding: 20,
                  borderRadius: 20,
                  background: "rgba(15,23,42,.96)",
                  border:
                    "1px solid rgba(148,163,184,.14)",
                  zIndex: 99,
                  boxShadow:
                    "0 30px 60px rgba(0,0,0,.35)"
                }}
              >
                <h3 style={{ marginTop: 0 }}>
                  Notifications
                </h3>

                <div
                  style={{
                    color: "#94a3b8",
                    marginBottom: 14
                  }}
                >
                  🚀 Dashboard updated successfully
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    marginBottom: 14
                  }}
                >
                  📝 New post system added
                </div>

                <div style={{ color: "#94a3b8" }}>
                  🔐 Authentication active
                </div>
              </div>
            )}

            <div style={s.hero}>
              <p
                style={{
                  color: "#22d3ee",
                  fontWeight: 900
                }}
              >
                PROFESSIONAL CMS
              </p>

              <h1 style={s.title}>
                Welcome back, {user?.name}
              </h1>

              <p style={s.text}>
                Manage content, analytics, posts and
                user activity from one professional
                dashboard interface.
              </p>

              <div style={s.clock}>
                🕒 {time.toLocaleTimeString()}
              </div>
            </div>

            <section style={s.stats}>
              {[
                ["📝", posts.length, "Total Posts"],
                ["👤", authors.size, "Authors"],
                ["🏷️", tags.size, "Tags"],
                ["⚡", "99%", "Performance"]
              ].map((item, i) => (
                <div
                  key={i}
                  style={s.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";
                  }}
                >
                  <div style={s.icon}>{item[0]}</div>

                  <h2 style={s.num}>{item[1]}</h2>

                  <p style={s.label}>{item[2]}</p>
                </div>
              ))}
            </section>

            <section style={s.grid}>
              <div style={s.panel}>
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

              <div style={s.panel}>
                <h2 style={s.h2}>Project Progress</h2>

                <p style={s.text}>
                  Your CMS system is almost production
                  ready.
                </p>

                <div style={s.progressWrap}>
                  <div style={s.progressBar}>
                    <div style={s.fill}></div>
                  </div>
                </div>

                <p
                  style={{
                    marginTop: 12,
                    color: "#22d3ee"
                  }}
                >
                  78% Completed
                </p>
              </div>

              <div style={s.panel}>
                <h2 style={s.h2}>Latest Post</h2>

                {latest ? (
                  <>
                    <h3 style={{ color: "#fff" }}>
                      {latest.title}
                    </h3>

                    <p style={s.text}>
                      {latest.content.slice(0, 120)}...
                    </p>

                    <Link
                      style={s.action}
                      to={`/posts/${latest.id}`}
                    >
                      Open Post
                    </Link>
                  </>
                ) : (
                  <p style={s.text}>
                    No posts available yet.
                  </p>
                )}
              </div>

              <div style={s.panel}>
                <h2 style={s.h2}>Recent Users</h2>

                <div style={s.users}>
                  {[1, 2, 3].map((u) => (
                    <div key={u} style={s.userCard}>
                      <div style={s.avatar}>
                        {user?.name?.charAt(0)}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: 800
                          }}
                        >
                          {user?.name}
                        </div>

                        <div
                          style={{
                            color: "#94a3b8"
                          }}
                        >
                          Active Member
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={s.panel}>
                <h2 style={s.h2}>
                  Activity Timeline
                </h2>

                <div
                  style={{
                    display: "grid",
                    gap: 18,
                    marginTop: 24
                  }}
                >
                  {[
                    "User logged in",
                    "Dashboard loaded",
                    "Posts synced",
                    "Analytics updated"
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: "#22d3ee"
                        }}
                      />

                      <div
                        style={{
                          color: "#cbd5e1"
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
