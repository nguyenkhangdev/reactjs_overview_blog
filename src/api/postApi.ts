import type { Post } from "../types/post.types";
import { api } from "./axios";

export const getPosts = async (): Promise<Post[]> => {
  const res = await api.get("/posts");
  return res.data.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const res = await api.get(`/posts/${id}`);
  return res.data.data;
};
