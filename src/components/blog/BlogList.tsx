import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IPost from '../../models/blog/IPost';
import EditBlogModal from './EditBlogModal';
import DeleteConfirm from './DeleteConfirm';

const BlogList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        // limit to first 20 posts for display
        const raw = res.data as IPost[];
        const data = raw.slice(0, 20).map((p: IPost) => ({
          ...p,
          thumbnailUrl: `https://picsum.photos/seed/${p.id}/300/200`,
        }));
        setPosts(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="my-3">
        <div className="p-5 text-center bg-body-tertiary rounded-3">
          <h1 className="text-body-emphasis">Welcome to Blog Manager</h1>
          <p className="lead">Browse blogs or Add Blog here.</p>
          <Link to="add" className="btn btn-primary">Add Blog</Link>
        </div>
      </div>

      <div className="row">
        <h2>Listing Blogs</h2>
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {posts.map((post) => (
          <div className="col-md-3" key={post.id}>
            <div className="card">
              <img src={post.thumbnailUrl} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-primary" onClick={() => { setSelectedPost(post); setIsEditOpen(true); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => { setSelectedPost(post); setIsDeleteOpen(true); }}>Delete</button>
                  <a href="#" className="btn btn-secondary">More Details</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <EditBlogModal
          isOpen={isEditOpen}
          post={selectedPost}
          onClose={() => { setIsEditOpen(false); setSelectedPost(undefined); }}
          onSaved={(updated) => {
            setPosts((prev) => prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
          }}
        />

        <DeleteConfirm
          isOpen={isDeleteOpen}
          post={selectedPost}
          onClose={() => { setIsDeleteOpen(false); setSelectedPost(undefined); }}
          onDeleted={(id) => {
            if (!id) return;
            setPosts((prev) => prev.filter((p) => p.id !== id));
          }}
        />
      </div>
    </>
  );
};

export default BlogList;
