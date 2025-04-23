import { Link } from "react-router-dom";

// Functional Component with Arrow Function
const MenuList = () => {
  return(
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/netflix">Netflix</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/employees">Employees</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/todos">Todos</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about-us">About Us</Link>
      </li>
    </ul>
  )
}

export default MenuList;