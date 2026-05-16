import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import PostForm from "../components/PostForm";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useLocalStorage("posts");

  const post = posts.find((item) => item.id === id);

  if (!post) {
    return <div className="empty">Post not found.</div>;
  }

  function handleUpdate(data) {
    const updatedPosts = posts.map((item) =>
      item.id === id
        ? {
            ...item,
            ...data,
            updatedAt: new Date().toISOString()
          }
        : item
    );

    setPosts(updatedPosts);
    navigate(`/posts/${id}`);
  }

  return (
    <section className="pageBox">
      <h1>Edit Post</h1>
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
  );
}
