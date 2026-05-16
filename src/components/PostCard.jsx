import { Link } from "react-router-dom";

export default function PostCard({ post, onDelete }) {
  return (
    <article className="postCard">
      <div className="cardTop">
        <span className="author">{post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <h2>{post.title}</h2>
      <p>{post.content.slice(0, 120)}...</p>

      <div className="tags">
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      <div className="actions">
        <Link to={`/posts/${post.id}`}>View</Link>
        <Link to={`/posts/${post.id}/edit`}>Edit</Link>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </article>
  );
}
