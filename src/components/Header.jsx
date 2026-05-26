import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const s = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "16px 7%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 18,
      background: "rgba(2,6,23,.90)",
      backdropFilter: "blur(18px)",
      borderBottom: "1px solid rgba(148,163,184,.14)",
      fontFamily: "Inter, Arial, sans-serif"
    },

    logo: {
      fontSize: 28,
      fontWeight: 900,
      color: "#fff",
      textDecoration: "none"
    },

    span: { color: "#22d3ee" },

    menuBtn: {
      display: "none",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: 28,
      cursor: "pointer"
    },

    nav: {
      display: "flex",
      alignItems: "center",
      gap: 18
    },

    link: ({ isActive }) => ({
      color: isActive ? "#22d3ee" : "#94a3b8",
      textDecoration: "none",
      fontWeight: 800,
      transition: ".25s"
    }),

    create: {
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "11px 16px",
      borderRadius: 13,
      color: "#fff",
      textDecoration: "none",
      fontWeight: 900
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: 14
    },

    bell: {
      width: 42,
      height: 42,
      borderRadius: "50%",
      border: "1px solid rgba(148,163,184,.16)",
      display: "grid",
      placeItems: "center",
      color: "#fff",
      cursor: "pointer",
      background: "rgba(15,23,42,.72)",
      position: "relative"
    },

    dot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#22d3ee",
      position: "absolute",
      top: 8,
      right: 8
    },

    userBox: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    },

    avatar: {
      width: 42,
      height: 42,
      borderRadius: "50%",
      display: "grid",
      placeItems: "center",
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      color: "#fff",
      fontWeight: 900
    },

    info: {
      display: "flex",
      flexDirection: "column"
    },

    name: {
      color: "#fff",
      fontWeight: 800
    },

    email: {
      color: "#64748b",
      fontSize: 12
    },

    logout: {
      border: "1px solid rgba(248,113,113,.28)",
      background: "rgba(127,29,29,.28)",
      color: "#fecaca",
      padding: "10px 14px",
      borderRadius: 12,
      cursor: "pointer",
      fontWeight: 900
    }
  };

  return (
    <header style={s.header}>
      <Link to="/" style={s.logo}>
        Post<span style={s.span}>Pilot</span>
      </Link>

      <button style={s.menuBtn} onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav style={{
        ...s.nav,
        ...(window.innerWidth < 900
          ? {
              position: "fixed",
              top: 80,
              left: 0,
              right: 0,
              background: "#020617",
              padding: 20,
              flexDirection: "column",
              display: open ? "flex" : "none"
            }
          : {})
      }}>
        <NavLink to="/" style={s.link}>Dashboard</NavLink>

        <NavLink to="/posts" style={s.link}>Posts</NavLink>

        <NavLink to="/profile" style={s.link}>Profile</NavLink>

        <NavLink to="/posts/new" style={s.create}>
          Create Post
        </NavLink>
      </nav>

      <div style={s.right}>
        <div style={s.bell}>
          🔔
          <span style={s.dot}></span>
        </div>

        <ThemeToggle />

        <div style={s.userBox}>
          <div style={s.avatar}>
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div style={s.info}>
            <span style={s.name}>{user?.name}</span>
            <span style={s.email}>{user?.email}</span>
          </div>
        </div>

        <button style={s.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
