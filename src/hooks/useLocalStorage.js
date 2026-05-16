import { useState, useEffect } from "react";
import { seedPosts } from "../data/seedPosts";

export default function useLocalStorage(key) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : seedPosts;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(posts));
  }, [key, posts]);

  return [posts, setPosts];
}
