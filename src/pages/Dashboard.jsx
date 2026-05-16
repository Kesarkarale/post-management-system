import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
  const [posts] = useLocalStorage("posts");
  const { user } = useAuth();

  const authors = new Set(posts.map((p) => p.author));
  const tags = new Set(posts.flatMap((p) => p.tags));
  const latest = posts[0];

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Hello, {user?.name}</h1>
          <p>
            Welcome to your professional post management system. Manage content,
            authors, tags and posts from one clean dashboard.
          </p>
        </div>
      </section>

      <section className="statsGrid">
        <div className="statCard">
          <h3>{posts.length}</h3>
          <p>Total Posts</p>
        </div>

        <div className="statCard">
          <h3>{authors.size}</h3>
          <p>Total Authors</p>
        </div>

        <div className="statCard">
          <h3>{tags.size}</h3>
          <p>Total Tags</p>
        </div>
      </section>

      <section className="dashboardGrid">
        <div className="dashPanel">
          <h2>Quick Actions</h2>
          <div className="quickActions">
            <Link to="/posts/new">Create New Post</Link>
            <Link to="/posts">Manage Posts</Link>
          </div>
        </div>

        <div className="dashPanel">
          <h2>Latest Post</h2>
          {latest ? (
            <>
              <h3>{latest.title}</h3>
              <p>{latest.content.slice(0, 130)}...</p>
              <Link className="primaryLink" to={`/posts/${latest.id}`}>
                View Post
              </Link>
            </>
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </section>
    </>
  );
}
