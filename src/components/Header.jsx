import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">PostPilot</Link>

      <nav>
        <NavLink to="/">Posts</NavLink>
        <NavLink to="/posts/new" className="createBtn">Create Post</NavLink>
      </nav>
    </header>
  );
}
