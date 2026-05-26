 import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PostForm from "../components/PostForm";
import Toast from "../components/Toast";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useLocalStorage("posts");
  const [toast, setToast] = useState("");

  const post = posts.find((item) => item.id === id);

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
    p: { color: "#94a3b8", lineHeight: 1.7 },
    btn: {
      display: "inline-block",
      marginTop: 18,
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "12px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      textDecoration: "none",
      border: "none",
      cursor: "pointer"
    }
  };

  if (!post) {
    return (
      <main style={s.wrap}>
        <section style={s.box}>
          <h1 style={s.h1}>Post not found</h1>
          <p style={s.p}>This post does not exist or may have been deleted.</p>
          <button style={s.btn} onClick={() => navigate("/posts")}>
            Back to Posts
          </button>
        </section>
      </main>
    );
  }

  function handleUpdate(data) {
    const updatedPosts = posts.map((item) =>
      item.id === id
        ? { ...item, ...data, updatedAt: new Date().toISOString() }
        : item
    );

    setPosts(updatedPosts);
    setToast("Post updated successfully");

    setTimeout(() => {
      navigate(`/posts/${id}`);
    }, 900);
  }

  return (
    <main style={s.wrap}>
      <Toast message={toast} onClose={() => setToast("")} />

      <section style={s.box}>
        <h1 style={s.h1}>Edit Post</h1>
        <p style={s.p}>Update post details and save your changes professionally.</p>

        <PostForm
          buttonText="Update Post"
          onSubmit={handleUpdate}
          initialData={{
            title: post.title,
            author: post.author,
            content: post.content,
            tags: post.tags.join(", ")
          }}
        />
      </section>
    </main>
  );
}
