import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  const s = {
    card: {
      background: "rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 24,
      boxShadow: "0 22px 45px rgba(0,0,0,.25)"
    },
    top: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      color: "#64748b",
      fontSize: 14,
      flexWrap: "wrap"
    },
    author: { color: "#22d3ee", fontWeight: 900 },
    h2: { color: "#f8fafc", margin: "18px 0 10px" },
    p: { color: "#94a3b8", lineHeight: 1.7 },
    tags: { display: "flex", gap: 8, flexWrap: "wrap", margin: "18px 0" },
    tag: {
      background: "rgba(8,145,178,.16)",
      border: "1px solid rgba(34,211,238,.2)",
      color: "#67e8f9",
      padding: "7px 10px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 800
    },
    actions: { display: "flex", gap: 10, flexWrap: "wrap" },
    link: {
      border: "1px solid rgba(148,163,184,.12)",
      padding: "10px 13px",
      borderRadius: 12,
      background: "rgba(2,6,23,.42)",
      color: "#e2e8f0",
      cursor: "pointer",
      fontWeight: 800,
      textDecoration: "none"
    },
    del: {
      border: "1px solid rgba(248,113,113,.25)",
      padding: "10px 13px",
      borderRadius: 12,
      background: "rgba(127,29,29,.25)",
      color: "#fecaca",
      cursor: "pointer",
      fontWeight: 800
    }
  };

  return (
    <article style={s.card}>
      <div style={s.top}>
        <span style={s.author}>{post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <h2 style={s.h2}>{post.title}</h2>
      <p style={s.p}>{post.content.slice(0, 120)}...</p>

      <div style={s.tags}>
        {post.tags.map((tag) => <span style={s.tag} key={tag}>#{tag}</span>)}
      </div>

      <div style={s.actions}>
        <Link style={s.link} to={`/posts/${post.id}`}>View</Link>
        <Link style={s.link} to={`/posts/${post.id}/edit`}>Edit</Link>
        <button style={s.del} onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}
