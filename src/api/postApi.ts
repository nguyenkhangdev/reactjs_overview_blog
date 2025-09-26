import type { PostType } from "../types/post.types";
import { api } from "./axios";

export const getPosts = async (): Promise<PostType[]> => {
  const res = await api.get("/posts");
  return res.data.data;
};

export const getPost = async (id: string): Promise<PostType> => {
  const res = await api.get(`/posts/${id}`);
  return res.data.data;
};

export const createPost = async (
  data: Omit<PostType, "id">
): Promise<PostType> => {
  const res = await api.post("/posts", data);
  return res.data;
};

export const updatePost = async (
  id: number,
  data: Omit<PostType, "id">
): Promise<PostType> => {
  const res = await api.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
