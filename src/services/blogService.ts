import axios from 'axios';
import IPost from '../models/blog/IPost';

const API_BASE = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = '/posts';

export const updatePost = async (id: number, data: Partial<IPost>): Promise<IPost> => {
  const res = await axios.put(`${API_BASE}${POSTS_ENDPOINT}/${id}`, data);
  return res.data as IPost;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}${POSTS_ENDPOINT}/${id}`);
};

export default { updatePost, deletePost };
