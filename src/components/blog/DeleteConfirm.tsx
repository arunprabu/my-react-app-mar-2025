import IPost from '../../models/blog/IPost';
import blogService from '../../services/blogService';
import { useState } from 'react';

interface Props {
  isOpen: boolean;
  post?: IPost;
  onClose: () => void;
  onDeleted: (id?: number) => void;
}

const DeleteConfirm = ({ isOpen, post, onClose, onDeleted }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !post) return null;

  const confirm = async () => {
    if (!post.id) return;
    setIsDeleting(true);
    setError(null);
    try {
      await blogService.deletePost(post.id);
      onDeleted(post.id);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Blog</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete "{post.title}"?</p>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isDeleting}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={confirm} disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'Delete'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
