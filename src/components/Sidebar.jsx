import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const s = {
    sidebar: {
      width: 260,
      minHeight: "100vh",
      background: "rgba(2,6,23,.96)",
      borderRight: "1px solid rgba(148,163,184,.12)",
      padding: 24,
      position: "fixed",
      left: 0,
      top: 0
    },

    logo: {
      color: "#fff",
      fontSize: 28,
      fontWeight: 900,
      marginBottom: 35
    },

    span: {
      color: "#22d3ee"
    },

    nav: {
      display: "grid",
      gap: 12
    },

    link: {
      padding: "14px 16px",
      borderRadius: 14,
      color: "#94a3b8",
      textDecoration: "none",
      fontWeight: 800,
      background: "rgba(15,23,42,.65)"
    }
  };

  return (
    <aside style={s.sidebar}>
      <div style={s.logo}>
        Post<span style={s.span}>Pilot</span>
      </div>

      <nav style={s.nav}>
        <NavLink style={s.link} to="/">Dashboard</NavLink>
        <NavLink style={s.link} to="/posts">Posts</NavLink>
        <NavLink style={s.link} to="/posts/new">Create Post</NavLink>
      </nav>
    </aside>
  );
}
