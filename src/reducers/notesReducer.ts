import { INote } from "../models/notes/INote";

export type NotesAction =
  | { type: 'SET_NOTES'; payload: INote[] }
  | { type: 'ADD_NOTE'; payload: INote }
  | { type: 'UPDATE_NOTE'; payload: INote }
  | { type: 'DELETE_NOTE'; payload: { id: string | number | Date } };

export function notesReducer(state: INote[], action: NotesAction) {
  switch (action.type) {
    case 'SET_NOTES':
      return [...action.payload];
    case 'ADD_NOTE':
      return [...state, action.payload];
    case 'UPDATE_NOTE':
      return state.map(n => n.id === action.payload.id ? action.payload : n);
    case 'DELETE_NOTE':
      return state.filter(n => n.id !== action.payload.id);
    default:
      return state;
  }
}
