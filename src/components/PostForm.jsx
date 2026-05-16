import { useState } from "react";

export default function PostForm({ initialData, onSubmit, buttonText }) {
  const [form, setForm] = useState(
    initialData || { title: "", author: "", content: "", tags: "" }
  );
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.content.trim()) e.content = "Content is required";
    if (form.content.trim().length < 20) e.content = "Content must be at least 20 characters";
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    onSubmit({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean)
    });
  }

  const s = {
    form: { display: "grid", gap: 13, marginTop: 20 },
    label: { color: "#cbd5e1", fontWeight: 900 },
    input: {
      padding: "15px 16px",
      borderRadius: 13,
      border: "1px solid rgba(148,163,184,.16)",
      background: "rgba(2,6,23,.55)",
      color: "#fff",
      outline: "none",
      fontFamily: "Inter, Arial, sans-serif"
    },
    error: { color: "#fca5a5", fontWeight: 700 },
    btn: {
      marginTop: 12,
      background: "linear-gradient(135deg,#0891b2,#14b8a6)",
      padding: "14px 18px",
      borderRadius: 13,
      color: "#fff",
      fontWeight: 900,
      border: "none",
      cursor: "pointer"
    }
  };

  return (
    <form style={s.form} onSubmit={handleSubmit}>
      <label style={s.label}>Title</label>
      <input style={s.input} name="title" value={form.title} onChange={handleChange} />
      {errors.title && <small style={s.error}>{errors.title}</small>}

      <label style={s.label}>Author</label>
      <input style={s.input} name="author" value={form.author} onChange={handleChange} />
      {errors.author && <small style={s.error}>{errors.author}</small>}

      <label style={s.label}>Content</label>
      <textarea style={s.input} name="content" rows="8" value={form.content} onChange={handleChange} />
      {errors.content && <small style={s.error}>{errors.content}</small>}

      <label style={s.label}>Tags</label>
      <input style={s.input} name="tags" value={form.tags} onChange={handleChange} placeholder="react, ui, project" />

      <button style={s.btn}>{buttonText}</button>
    </form>
  );
}
