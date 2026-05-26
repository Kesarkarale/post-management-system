import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PostCard from "../components/PostCard";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

export default function PostList() {
  const [posts, setPosts] = useLocalStorage("posts");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("newest");
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(null);
const [toast, setToast] = useState("");

  const authors = ["all", ...new Set(posts.map((p) => p.author))];
  const tags = ["all", ...new Set(posts.flatMap((p) => p.tags))];

  let filtered = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(search.toLowerCase()) &&
      (author === "all" || post.author === author) &&
      (tag === "all" || post.tags.includes(tag))
    );
  });

  filtered = [...filtered].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    return a.title.localeCompare(b.title);
  });

  function deletePost(id) {
  setDeleteId(id);
}

function confirmDelete() {
  setPosts(posts.filter((p) => p.id !== deleteId));
  setDeleteId(null);
  setToast("Post deleted successfully");
}

  const s = {
    wrap: {
      width: "min(1180px,92%)",
      margin: "auto",
      padding: "34px 0",
      fontFamily: "Inter, Arial, sans-serif"
    },
    hero: {
      padding: 48,
      borderRadius: 26,
      marginBottom: 26,
      background:
        "linear-gradient(135deg,rgba(8,145,178,.16),rgba(20,184,166,.1)),rgba(15,23,42,.76)",
      border: "1px solid rgba(148,163,184,.14)",
      boxShadow: "0 25px 55px rgba(0,0,0,.28)"
    },
    eyebrow: { color: "#22d3ee", letterSpacing: 2, fontWeight: 900 },
    h1: { fontSize: 52, color: "#f8fafc", margin: "10px 0" },
    text: { color: "#94a3b8", lineHeight: 1.7 },
    toolbar: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
      gap: 14,
      marginBottom: 24
    },
   input: {
     padding: "15px 16px",
     borderRadius: 13,
     border: "1px solid rgba(148,163,184,.16)",
     background: "rgba(2,6,23,.55)",
     color: "#fff",
     outline: "none",
     transition: ".25s",
     transform: "scale(1)"
  },
    btn: {
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 13,
      fontWeight: 900,
      color: "#e2e8f0",
      background: "rgba(15,23,42,.75)",
      cursor: "pointer"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
      gap: 22
    },
    empty: {
      textAlign: "center",
      padding: 50,
      borderRadius: 22,
      background: "rgba(15,23,42,.78)",
      color: "#94a3b8"
    },
    fab: {
      position: "fixed",
      right: 28,
      bottom: 28,
      width: 65,
      height: 65,
      borderRadius: "50%",
      border: "none",
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      color: "#fff",
      fontSize: 32,
      cursor: "pointer",
      boxShadow: "0 20px 40px rgba(20,184,166,.3)"
    }
  };

  return (
    <main style={s.wrap}>
      <section style={s.hero}>
        <p style={s.eyebrow}>POST MANAGEMENT</p>
        <h1 style={s.h1}>Manage Posts</h1>
        <p style={s.text}>
          Search, filter, sort, view, edit and delete posts professionally.
        </p>
      </section>

      <section style={s.toolbar}>
      <input
        style={s.input}
        placeholder="Search by title..."
        value={search}
        onFocus={(e) => {
        e.target.style.transform = "scale(1.03)";
        e.target.style.border = "1px solid #22d3ee";
        }}
        onBlur={(e) => {
        e.target.style.transform = "scale(1)";
         e.target.style.border =
         "1px solid rgba(148,163,184,.16)";
          }}
         onChange={(e) => setSearch(e.target.value)}
         />
        
        <select style={s.input} value={author} onChange={(e) => setAuthor(e.target.value)}>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a === "all" ? "All Authors" : a}
            </option>
          ))}
        </select>

        <select style={s.input} value={tag} onChange={(e) => setTag(e.target.value)}>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All Tags" : t}
            </option>
          ))}
        </select>

        <select style={s.input} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>

        <button
          style={s.btn}
          onClick={() => {
            setSearch("");
            setAuthor("all");
            setTag("all");
            setSort("newest");
          }}
        >
          Clear
        </button>
      </section>

      {filtered.length === 0 ? (
        <div style={s.empty}>
          <h2 style={{ color: "#fff" }}>No Posts Found</h2>
          <p>Try changing your filters or create a new post.</p>
        </div>
      ) : (
        <section style={s.grid}>
          {filtered.map((post) => (
           <PostCard
  key={post.id}
  post={post}
  onDelete={() => deletePost(post.id)}
/>
          ))}
        </section>
      )}

      <button style={s.fab} onClick={() => navigate("/posts/new")}>
        +
      </button>
      <ConfirmModal
  open={!!deleteId}
  title="Delete Post"
  message="Are you sure you want to permanently delete this post?"
  onCancel={() => setDeleteId(null)}
  onConfirm={confirmDelete}
/>

<Toast
  message={toast}
  onClose={() => setToast("")}
/>
    </main>
  );
}
