import { useForm } from "react-hook-form";
import { INote } from "../../models/notes/INote";

type AddNoteForm = {
  title: string;
  content?: string;
}

type AddNoteProps = {
  onAdd: (note: INote) => void;
}

const AddNote = ({ onAdd }: AddNoteProps) => {
  const { register, handleSubmit, reset } = useForm<AddNoteForm>();

  const onSubmit = (data: AddNoteForm) => {
    const now = new Date().toISOString();
    const note: INote = {
      id: now,
      title: data.title,
      content: data.content || '',
      createdAt: now,
      updatedAt: undefined
    }
    onAdd(note);
    reset();
  }

  return (
    <form className="mb-3" onSubmit={handleSubmit(onSubmit)} data-testid="add-note-form">
      <div className="form-group mb-2">
        <label htmlFor="noteTitle">Title</label>
        <input id="noteTitle" {...register('title', { required: true })} className="form-control" placeholder="Note title" />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="noteContent">Content</label>
        <textarea id="noteContent" {...register('content')} className="form-control" rows={3} placeholder="Add details..." />
      </div>
      <div>
        <button type="submit" className="btn btn-primary" data-testid="add-note-button">Add Note</button>
      </div>
    </form>
  )
}

export default AddNote;
