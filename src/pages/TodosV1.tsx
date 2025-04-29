import { useRef } from "react";

const TodosV1 = () => {
  const todoInput = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    console.log("Clicked");
    // reading the form input value
    console.log(todoInput?.current?.value);
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="mt-4">
          <h2 className="text-center mb-4">Todo App | Using useState based Demo | [TODO to TRAINEES]</h2>
          <div className="input-group mb-3">
            <input
              type='text'
              className='form-control'
              placeholder='Add a new todo...'
              ref={todoInput}
            />
            <button type='button' className='btn btn-primary' onClick={handleAddTodo}>Add Todo</button>
          </div>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              my todo #1
              <button type="button" className="btn btn-danger btn-sm">Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodosV1;