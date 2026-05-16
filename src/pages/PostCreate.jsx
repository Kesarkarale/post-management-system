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

    const newPost = {
      id: createId(),
      ...data,
      createdAt: now,
      updatedAt: now
    };

    setPosts([newPost, ...posts]);
    navigate("/");
  }

  return (
    <section className="pageBox">
      <h1>Create New Post</h1>
      <PostForm buttonText="Create Post" onSubmit={handleCreate} />
    </section>
  );
}
