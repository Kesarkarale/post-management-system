import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PostCard from "../components/PostCard";

export default function PostList() {
  const [posts, setPosts] = useLocalStorage("posts");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");

  const authors = ["all", ...new Set(posts.map((post) => post.author))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesAuthor = author === "all" || post.author === author;
    return matchesSearch && matchesAuthor;
  });

  function deletePost(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    setPosts(posts.filter((post) => post.id !== id));
  }

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Mini CRUD App</p>
          <h1>Manage your posts professionally</h1>
          <p>
            Create, read, update, delete, search and filter posts with localStorage persistence.
          </p>
        </div>
      </section>

      <section className="toolbar">
        <input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {authors.map((name) => (
            <option key={name} value={name}>
              {name === "all" ? "All Authors" : name}
            </option>
          ))}
        </select>
      </section>

      {filteredPosts.length === 0 ? (
        <div className="empty">No posts found.</div>
      ) : (
        <section className="grid">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onDelete={deletePost} />
          ))}
        </section>
      )}
    </>
  );
}
