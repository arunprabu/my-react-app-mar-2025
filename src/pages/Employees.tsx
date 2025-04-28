import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Employees = () => {
  console.log("1. Program Started");

  // Let's first keep the state with initial data
  const [employeeList, setEmployeeList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ideal place for you to connect to the backend -- useEffect hook
  useEffect(() => {
    // this hook will be called automatically after initial rendering
    console.log("3. Inside useEffect");
    // This is the ideal place for us to hit the REST API 
    // connect to the backend 
    // 1. What's the REST API URL? https://jsonplaceholder.typicode.com/users
    // 2. What's the HTTP Method? GET
    // 3. What's the REST API Client tool? axios (npm i axios)
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res: any) => { // if success
        console.log(res.data);
        setEmployeeList(res.data);
      })
      .catch((err) => { // error
        console.log(err);
      })
      .finally(() => {
        console.log("It is over!");
        setIsLoading(false);
      });
  }, []); // empty array is -- dependencyList

  console.log("2. Program Ended after rendering the JSX");
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

        {
          isLoading &&
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        }

        {/* Lists and Keys */}
        {
          employeeList?.map((employee: any) => {
            return (
              <div className="col-md-3" key={employee.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{employee?.name}</h5>
                    <p className="card-text">Phone: {employee?.phone}</p>
                    <p className="card-text">Email: {employee?.email}</p>
                    <Link to={employee?.id} className="btn btn-outline-primary btn-sm">View More</Link>
                  </div>
                </div>
              </div>
            )
          })
        }


      </div>
    </>
  )
}

export default Employees