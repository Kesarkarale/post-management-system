import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PostForm from "../components/PostForm";

export default function PostCreate() {
  const [posts, setPosts] = useLocalStorage("posts");
  const navigate = useNavigate();

  function createId() {
    return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  }

  function handleCreate(data) {
    const now = new Date().toISOString();
    const newPost = { id: createId(), ...data, createdAt: now, updatedAt: now };
    setPosts([newPost, ...posts]);
    navigate("/posts");
  }

  const s = {
    wrap: {
      width: "min(900px,92%)",
      margin: "auto",
      padding: "34px 0",
      fontFamily: "Inter, Arial, sans-serif"
    },
    box: {
      background: "rgba(15,23,42,.78)",
      border: "1px solid rgba(148,163,184,.14)",
      borderRadius: 22,
      padding: 28,
      boxShadow: "0 22px 45px rgba(0,0,0,.25)"
    },
    h1: { color: "#f8fafc", fontSize: 42, marginTop: 0 },
    p: { color: "#94a3b8", lineHeight: 1.7 }
  };

  return (
    <main style={s.wrap}>
      <section style={s.box}>
        <h1 style={s.h1}>Create New Post</h1>
        <p style={s.p}>Add title, author, content and tags to publish a new post.</p>
        <PostForm buttonText="Create Post" onSubmit={handleCreate} />
      </section>
    </main>
  );
}
