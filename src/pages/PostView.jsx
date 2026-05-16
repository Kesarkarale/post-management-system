import { Link, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function PostView() {
  const { id } = useParams();
  const [posts] = useLocalStorage("posts");

  const post = posts.find((item) => item.id === id);

  if (!post) {
    return <div className="empty">Post not found.</div>;
  }

  return (
    <section className="detailsBox">
      <Link to="/" className="backLink">← Back to list</Link>

      <h1>{post.title}</h1>

      <div className="meta">
        <span>Author: {post.author}</span>
        <span>Created: {new Date(post.createdAt).toLocaleString()}</span>
        <span>Updated: {new Date(post.updatedAt).toLocaleString()}</span>
      </div>

      <p className="fullContent">{post.content}</p>

      <div className="tags">
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <Link to={`/posts/${post.id}/edit`} className="primaryLink">
        Edit Post
      </Link>
    </section>
  );
}
