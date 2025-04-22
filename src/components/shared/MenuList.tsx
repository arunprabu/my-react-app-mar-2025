// Functional Component with Arrow Function
const MenuList = () => {
  return(
    <ul className="navbar-nav me-auto mb-2 mb-md-0">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Netflix</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">About Us</a>
      </li>
    </ul>
  )
}

export default MenuList;