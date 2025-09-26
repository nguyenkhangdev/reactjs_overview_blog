import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost, deletePost } from "../api/postApi";
import type { PostType } from "../types/post.types";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost: Omit<PostType, "id">) => {
      await qc.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = qc.getQueryData<PostType[]>(["posts"]);

      // Cập nhật cache local trước
      qc.setQueryData<PostType[]>(["posts"], (old) => [
        ...(old || []),
        { ...newPost, id: Date.now() },
      ]);

      return { previousPosts };
    },
    onError: (_err, _newPost, context) => {
      if (context?.previousPosts)
        qc.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...rest }: PostType) => updatePost(id, rest),
    onMutate: async (updatedPost: PostType) => {
      await qc.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = qc.getQueryData<PostType[]>(["posts"]);

      qc.setQueryData<PostType[]>(["posts"], (old) =>
        old?.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );

      return { previousPosts };
    },
    onError: (_err, _updatedPost, context) => {
      if (context?.previousPosts)
        qc.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = qc.getQueryData<PostType[]>(["posts"]);

      qc.setQueryData<PostType[]>(["posts"], (old) =>
        old?.filter((p) => p.id !== id)
      );

      return { previousPosts };
    },
    onError: (_err, _id, context) => {
      if (context?.previousPosts)
        qc.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}
