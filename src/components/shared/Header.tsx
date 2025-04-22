/* Component Blueprint 
  1. can have imports 
  2. component definition 
      must return JSX 

  3. export the component
*/

import MenuList from "./MenuList";

//  Functional Component with Named Function 
function Header() {
  // must return JSX
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">My React App</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <MenuList />
        </div>
      </div>
    </nav>
  )
}

export default Header;