import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddBlog = () => {
  const { register, handleSubmit } = useForm();
  const [isSaved, setIsSaved] = useState(false);

  const handleAddBlog = (formData: any) => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', formData)
      .then(() => {
        setIsSaved(true);
      });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Add Blog</h1>
      </div>

      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit(handleAddBlog)}>
        <div className="form-group row mb-3">
          <label htmlFor="titleInput" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="titleInput" placeholder="Enter Title" {...register('title')} />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label htmlFor="bodyInput" className="col-sm-2 col-form-label">Body</label>
          <div className="col-sm-10">
            <textarea id="bodyInput" className="form-control" rows={5} placeholder="Enter body" {...register('body')}></textarea>
          </div>
        </div>

        {isSaved && <div className="alert alert-success"> Saved Successfully</div>}

        <div className="form-group row">
          <div className="col-sm-10 offset-sm-2">
            <button type="submit" className="btn btn-primary submitBtn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
