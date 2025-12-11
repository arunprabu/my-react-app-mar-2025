import { INote } from "../../models/notes/INote";
import EditNote from "./EditNote";
import { useState } from "react";

type NoteListProps = {
  notes: INote[];
  onDelete: (id: string | number | Date) => void;
  onUpdate: (note: INote) => void;
}

const NoteList = ({ notes, onDelete, onUpdate }: NoteListProps) => {
  const [editingId, setEditingId] = useState<string | number | Date | null>(null);

  if (!notes || notes.length === 0) {
    return <div className="alert alert-warning">No notes found. Add your first note!</div>
  }

  return (
    <ul className="list-group">
      {notes.map(note => (
        <li className="list-group-item" key={String(note.id)} data-testid={`note-item-${String(note.id)}`}>
          {
            editingId === note.id ? (
              <EditNote
                note={note}
                onSave={(n) => { onUpdate(n); setEditingId(null); }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{note.title}</h5>
                  <p className="mb-1">{note.content ? note.content : <em className="text-muted">No content</em>}</p>
                  <small className="text-muted">Created: {new Date(note.createdAt).toLocaleString()}</small>
                  {note.updatedAt && <div><small className="text-muted">Updated: {new Date(note.updatedAt).toLocaleString()}</small></div>}
                </div>
                <div className="d-flex flex-column align-items-end gap-2">
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditingId(note.id)} data-testid={`edit-note-${String(note.id)}`}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(note.id)} data-testid={`delete-note-${String(note.id)}`}>Delete</button>
                  </div>
                </div>
              </div>
            )
          }
        </li>
      ))}
    </ul>
  )
}

export default NoteList;
