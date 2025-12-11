import { useForm } from "react-hook-form";
import { INote } from "../../models/notes/INote";

type EditNoteForm = {
  title: string;
  content?: string;
}

type EditNoteProps = {
  note: INote;
  onSave: (note: INote) => void;
  onCancel: () => void;
}

const EditNote = ({ note, onSave, onCancel }: EditNoteProps) => {
  const { register, handleSubmit } = useForm<EditNoteForm>({ defaultValues: { title: note.title, content: note.content } });

  const onSubmit = (data: EditNoteForm) => {
    const updatedAt = new Date().toISOString();
    onSave({ ...note, title: data.title, content: data.content ?? '', updatedAt });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid={`edit-note-form-${note.id}`}>
      <div className="form-group mb-2">
        <label className="form-label" htmlFor={`editTitle-${note.id}`}>Title</label>
        <input id={`editTitle-${note.id}`} className="form-control" {...register('title', { required: true })} />
      </div>
      <div className="form-group mb-2">
        <label className="form-label" htmlFor={`editContent-${note.id}`}>Content</label>
        <textarea id={`editContent-${note.id}`} className="form-control" {...register('content')} rows={3}></textarea>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary btn-sm" data-testid={`save-note-${note.id}`}>Save</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onCancel()} data-testid={`cancel-note-${note.id}`}>Cancel</button>
      </div>
    </form>
  )
}

export default EditNote;
