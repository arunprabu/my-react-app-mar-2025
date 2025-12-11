import { useEffect, useReducer } from "react";
import AddNote from "../components/notes/AddNote";
import NoteList from "../components/notes/NoteList";
import { notesReducer } from "../reducers/notesReducer";
import { getNotes, saveNotes } from "../services/notesService";
import { INote } from "../models/notes/INote";

const Notes = () => {
  const [notesState, notesDispatch] = useReducer(notesReducer, [] as INote[], () => getNotes());

  useEffect(() => {
    saveNotes(notesState);
  }, [notesState]);

  const addNote = (note: INote) => {
    notesDispatch({ type: 'ADD_NOTE', payload: note });
  }

  const deleteNote = (id: string | number | Date) => {
    notesDispatch({ type: 'DELETE_NOTE', payload: { id } });
  }

  const updateNote = (note: INote) => {
    notesDispatch({ type: 'UPDATE_NOTE', payload: note });
  }

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <h1>Notes</h1>
        <AddNote onAdd={addNote} />
        <NoteList notes={notesState} onDelete={deleteNote} onUpdate={updateNote} />
      </div>
    </div>
  )
}

export default Notes;
