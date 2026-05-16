import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <Link to="/" className="logo">PostPilot</Link>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/posts">Posts</NavLink>
        <NavLink to="/posts/new" className="createBtn">Create Post</NavLink>
      </nav>

      <div className="userBox">
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}
