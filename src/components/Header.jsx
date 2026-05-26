import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const s = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 20,
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
      fontSize: 26,
      fontWeight: 900,
      color: "#fff",
      textDecoration: "none"
    },
    logoSpan: { color: "#22d3ee" },
    nav: {
      display: "flex",
      gap: 18,
      alignItems: "center",
      flexWrap: "wrap"
    },
    link: ({ isActive }) => ({
      color: isActive ? "#22d3ee" : "#94a3b8",
      textDecoration: "none",
      fontWeight: 800
    }),
    create: {
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "11px 16px",
      borderRadius: 13,
      color: "#fff",
      textDecoration: "none",
      fontWeight: 900
    },
    userBox: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      color: "#cbd5e1",
      fontWeight: 800
    },
    email: {
      color: "#64748b",
      fontSize: 13
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
        Post<span style={s.logoSpan}>Pilot</span>
      </Link>

      <nav style={s.nav}>
        <NavLink to="/" style={s.link}>Dashboard</NavLink>
        <NavLink to="/posts" style={s.link}>Posts</NavLink>
        <NavLink to="/posts/new" style={s.create}>Create Post</NavLink>
      </nav>
<ThemeToggle />
      <div style={s.userBox}>
        <div>
          <div>{user?.name}</div>
          <div style={s.email}>{user?.email}</div>
        </div>
        <button style={s.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
