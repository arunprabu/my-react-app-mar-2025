/*
What's Reducer?
----
  * Reducer is a function that takes in two arguments: state and action
  * the function must return updated state 
  * if you want to call the reducer function, you must dispatch an action from the component
  * state is the current state of the application -- initial state
  * action is an object, must have type property and an optional payload property 
*/
import { ITodo } from "../models/todos/ITodo";

export function todosReducer(state: ITodo[], action: any) {
  console.log("Inside todosReducer");
  console.log(action);
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        action.payload
      ]

    case "DELTE_TODO": 
      // return the todosList after deleting the action.payload.id
      return  state
  }
  return state;
}
