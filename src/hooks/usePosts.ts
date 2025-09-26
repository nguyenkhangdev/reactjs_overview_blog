import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost, deletePost } from "../api/postApi";
import type { PostType } from "../types/post.types";

export function usePosts() {
  return useQuery({ queryKey: ["posts"], queryFn: getPosts });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PostType) => {
      const { id, ...rest } = data;
      return updatePost(id, rest);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
