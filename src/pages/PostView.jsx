import { Link, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PostView() {
  const { id } = useParams();
  const [posts] = useLocalStorage("posts");
  const post = posts.find((item) => item.id === id);

  const s = {
    wrap: {
      width: "min(950px,92%)",
      margin: "auto",
      padding: "34px 0",
      fontFamily: "Inter, Arial, sans-serif"
    },
    box: {
      background: "rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 30,
      boxShadow: "0 22px 45px rgba(0,0,0,.25)"
    },
    back: { color: "#22d3ee", fontWeight: 900, textDecoration: "none" },
    h1: { color: "#f8fafc", fontSize: 46, marginBottom: 14 },
    meta: { display: "flex", gap: 14, flexWrap: "wrap", color: "#64748b", fontSize: 14, marginBottom: 22 },
    content: { color: "#94a3b8", lineHeight: 1.8, fontSize: 18 },
    tags: { display: "flex", gap: 8, flexWrap: "wrap", margin: "22px 0" },
    tag: {
      background: "rgba(8,145,178,.16)",
      border: "1px solid rgba(34,211,238,.2)",
      color: "#67e8f9",
      padding: "7px 10px",
      borderRadius: 999,
      fontSize: 13,
      fontWeight: 800
    },
    btn: {
      display: "inline-block",
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "12px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      textDecoration: "none"
    }
  };

  if (!post) {
    return (
      <main style={s.wrap}>
        <section style={s.box}>
          <h1 style={s.h1}>Post not found</h1>
          <Link style={s.back} to="/posts">← Back to posts</Link>
        </section>
      </main>
    );
  }

  return (
    <main style={s.wrap}>
      <section style={s.box}>
        <Link style={s.back} to="/posts">← Back to posts</Link>

        <h1 style={s.h1}>{post.title}</h1>

        <div style={s.meta}>
          <span>Author: {post.author}</span>
          <span>Created: {new Date(post.createdAt).toLocaleString()}</span>
          <span>Updated: {new Date(post.updatedAt).toLocaleString()}</span>
        </div>

        <p style={s.content}>{post.content}</p>

        <div style={s.tags}>
          {post.tags.map((tag) => <span style={s.tag} key={tag}>#{tag}</span>)}
        </div>

        <Link style={s.btn} to={`/posts/${post.id}/edit`}>Edit Post</Link>
      </section>
    </main>
  );
}
