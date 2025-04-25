import { Link } from "react-router-dom"

const Employees = () => {
  return (
    <>
      <div className="my-3">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">Welcome to Employee Manager</h1>
          <p className="lead">
            Browse Employees or Add Employee here.
          </p>
          <Link to="add" className="btn btn-primary">Add Employee</Link>
        </div>
      </div>

      <div className="row">
        <h2>Listing Employees</h2>
        {/* Employee Card */}
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">John</h5>
              <p className="card-text">Phone: 324536758</p>
              <p className="card-text">Email: j@k.com</p>
              <Link to="1" className="btn btn-outline-primary btn-sm">View More</Link>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Employees