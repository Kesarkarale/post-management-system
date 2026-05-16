import { useState } from "react";

export default function PostForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      author: "",
      content: "",
      tags: ""
    }
  );

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.content.trim()) newErrors.content = "Content is required";
    if (form.content.trim().length < 20) {
      newErrors.content = "Content must be at least 20 characters";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
    });
  }

  return (
    <form className="formBox" onSubmit={handleSubmit}>
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} />
      {errors.title && <small>{errors.title}</small>}

      <label>Author</label>
      <input name="author" value={form.author} onChange={handleChange} />
      {errors.author && <small>{errors.author}</small>}

      <label>Content</label>
      <textarea name="content" rows="8" value={form.content} onChange={handleChange} />
      {errors.content && <small>{errors.content}</small>}

      <label>Tags</label>
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="react, ui, project"
      />

      <button className="primaryBtn">{buttonText}</button>
    </form>
  );
}
