import { NavLink } from "react-router-dom";

// Functional Component with Arrow Function
const MenuList = () => {
  return (
    <nav aria-label="Main navigation">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/netflix">Netflix</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/employees">Employees</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/todos-version2">Todos using useReducer</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/spotify">Spotify</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/notes">Notes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about-us">About Us</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MenuList;