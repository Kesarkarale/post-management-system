import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const result = register(form.name, form.email, form.password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <section className="authPage">
      <div className="bgBlur blur1"></div>
<div className="bgBlur blur2"></div>
<div className="bgBlur blur3"></div>
      <div className="authCard">
        <p className="eyebrow">Create Account</p>
        <h1>Register on PostPilot</h1>
        <p className="authText">Start managing your posts professionally.</p>

        {error && <div className="authError">{error}</div>}

        <form onSubmit={handleSubmit} className="authForm">
          <input
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button className="primaryBtn">Create Account</button>
        </form>

        <p className="switchText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
