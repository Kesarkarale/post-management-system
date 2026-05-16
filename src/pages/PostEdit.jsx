import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PostForm from "../components/PostForm";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useLocalStorage("posts");

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
    p: { color: "#94a3b8", lineHeight: 1.7 }
  };

  if (!post) {
    return (
      <main style={s.wrap}>
        <section style={s.box}>
          <h1 style={s.h1}>Post not found</h1>
        </section>
      </main>
    );
  }

  function handleUpdate(data) {
    const updatedPosts = posts.map((item) =>
      item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item
    );

    setPosts(updatedPosts);
    navigate(`/posts/${id}`);
  }

  return (
    <main style={s.wrap}>
      <section style={s.box}>
        <h1 style={s.h1}>Edit Post</h1>
        <p style={s.p}>Update your post information and save changes.</p>
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
