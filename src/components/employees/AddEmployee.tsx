import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddEmployee = () => {
  const { register, handleSubmit} = useForm();
  const [isSaved, setIsSaved] = useState(false);

  const handleAddEmployee = (formData: any) => { // collect the form data
    console.log(formData);
    // let's submit the form data
    
    // 1. What's the REST API URL? https://jsonplaceholder.typicode.com/users
    // 2. What's the HTTP Method? POST
    // 3. What's the REST API Client tool? axios 
    axios.post("https://jsonplaceholder.typicode.com/users", formData)
      .then( (res) => {
        console.log(res);
        setIsSaved(true);
      })
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Add Employee</h1>
      </div>

      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit(handleAddEmployee)}>
        <div className="form-group row mb-3">
          <label htmlFor="nameInput" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="nameInput" placeholder="Enter Name" {...register("employeeName")} />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label htmlFor="phoneInput" className="col-sm-2 col-form-label">Phone</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" placeholder="Enter Phone" id="phoneInput" {...register("phone")} />
          </div>
        </div>
        <div className="form-group row mb-3">
          <label htmlFor="emailInput" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" placeholder="Enter Email" id="emailInput" {...register("email")} />
          </div>
        </div>
        {
          isSaved && <div className="alert alert-success"> Saved Successfully</div>
        }
        
        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary submitBtn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

  )
}

export default AddEmployee