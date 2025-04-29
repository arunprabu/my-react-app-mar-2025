import { useReducer, useRef } from "react";
import { todosReducer } from "../reducers/todosReducer";

const TodosV2 = () => {
  const todoInput = useRef<HTMLInputElement>(null);
  const [todoState, todoDispatch] = useReducer(todosReducer, []);
  console.log("TodoState", todoState);

  const handleAddTodo = () => {
    // reading the form input value
    console.log(todoInput?.current?.value);
    // to update the state -- call the dispatcher function with action obj
    todoDispatch({
      type: "ADD_TODO",
      payload: {
        id: new Date(),
        title: todoInput?.current?.value,
        isCompleted: false
      }
    })
  }

  const handleDelete = (todoId: Date) => {
    todoDispatch({
      type: "DELETE_TODO",
      payload: {
        id: todoId
      }
    })
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="mt-4">
          <h2 className="text-center mb-4">Todo App | Using useReducer based Demo</h2>
          <div className="input-group mb-3">
            <input
              type='text'
              className='form-control'
              placeholder='Add a new todo...'
              ref={todoInput}
            />
            <button type='button' className='btn btn-primary'
              onClick={handleAddTodo}>Add Todo</button>
          </div>
          <hr />
          {
            todoState.length === 0 &&
            <div className="alert alert-warning">No todos found. Please add one!</div>
          }

          <ul className="list-group list-group-flush">
            {/* Lists and Keys */}
            {
              todoState?.map((todo) => {
                return (
                  <li className="list-group-item d-flex justify-content-between
                     align-items-center" key={todo.id}>
                    {todo.title}
                    <button type="button" className="btn btn-danger btn-sm"
                    onClick={ () => handleDelete(todo.id)}>Delete</button>
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodosV2;