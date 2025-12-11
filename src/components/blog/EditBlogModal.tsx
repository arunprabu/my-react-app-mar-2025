import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import IPost from '../../models/blog/IPost';
import blogService from '../../services/blogService';

interface Props {
  isOpen: boolean;
  post?: IPost;
  onClose: () => void;
  onSaved: (post: IPost) => void;
}

const EditBlogModal = ({ isOpen, post, onClose, onSaved }: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      reset({ title: post.title, body: post.body });
    }
  }, [post, reset]);

  const onSubmit = async (data: Partial<IPost>) => {
    if (!post || !post.id) return;
    setIsSaving(true);
    setError(null);
    try {
      const updated = await blogService.updatePost(post.id, data);
      onSaved(updated);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Blog</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input id="editTitle" className="form-control" {...register('title', { required: true })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea id="editBody" className="form-control" rows={4} {...register('body', { required: true })}></textarea>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSaving}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
