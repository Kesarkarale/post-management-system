import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PostCard from "../components/PostCard";
import Toast from "../components/Toast";
import DeleteModal from "../components/DeleteModal";

export default function PostList() {
  const [posts, setPosts] = useLocalStorage("posts");
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [tag, setTag] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const perPage = 6;

  const authors = ["all", ...new Set(posts.map((post) => post.author))];
  const tags = ["all", ...new Set(posts.flatMap((post) => post.tags))];

  let filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    const matchesAuthor = author === "all" || post.author === author;
    const matchesTag = tag === "all" || post.tags.includes(tag);
    return matchesSearch && matchesAuthor && matchesTag;
  });

  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (sort === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const totalPages = Math.ceil(filteredPosts.length / perPage);
  const visiblePosts = filteredPosts.slice((page - 1) * perPage, page * perPage);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  function confirmDelete() {
    setPosts(posts.filter((post) => post.id !== deleteId));
    setDeleteId(null);
    showToast("Post deleted successfully");
  }

  function clearFilters() {
    setSearch("");
    setAuthor("all");
    setTag("all");
    setSort("newest");
    setPage(1);
  }

  return (
    <>
      <Toast message={toast} />

      <DeleteModal
        open={deleteId}
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <section className="hero">
        <div>
          <p className="eyebrow">Professional Mini CRUD App</p>
          <h1>Post Management System</h1>
          <p>
            Create, edit, delete, search, filter, sort and manage posts with a clean admin-style interface.
          </p>
        </div>
      </section>

      <section className="statsGrid">
        <div className="statCard">
          <h3>{posts.length}</h3>
          <p>Total Posts</p>
        </div>
        <div className="statCard">
          <h3>{authors.length - 1}</h3>
          <p>Authors</p>
        </div>
        <div className="statCard">
          <h3>{tags.length - 1}</h3>
          <p>Tags</p>
        </div>
      </section>

      <section className="toolbar upgradedToolbar">
        <input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          {authors.map((name) => (
            <option key={name} value={name}>
              {name === "all" ? "All Authors" : name}
            </option>
          ))}
        </select>

        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All Tags" : item}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
        </select>

        <button className="clearBtn" onClick={clearFilters}>Clear</button>
      </section>

      {visiblePosts.length === 0 ? (
        <div className="empty upgradedEmpty">
          <h2>No posts found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <section className="grid">
          {visiblePosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={() => setDeleteId(post.id)}
            />
          ))}
        </section>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>

          <span>Page {page} of {totalPages}</span>

          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </>
  );
}
