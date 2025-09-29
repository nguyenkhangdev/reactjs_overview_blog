import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost, deletePost } from "../api/postApi";
import type { PostType } from "../types/post.types";
import { message } from "antd";

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
      await qc.cancelQueries({ queryKey: ["posts"] }); // cancel all request key posts to avoid conflict
      const previous = qc.getQueryData<PostType[]>(["posts"]); //get old data in cache
      qc.setQueryData<PostType[]>(["posts"], (old) => [
        ...(old || []),
        { ...newPost, id: Date.now() },
      ]); // optimistic ui
      return { previous };
    },
    onError: (_err, _newPost, ctx) => {
      if (ctx?.previous) qc.setQueryData(["posts"], ctx.previous);
      message.error("Failed to create post");
    },
    onSuccess: () => {
      message.success("Post created successfully");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }), //Call invalidateQueries to refetch data from the server, ensuring the cache is in sync with the backend.
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...rest }: PostType) => updatePost(id, rest),
    onMutate: async (updated) => {
      await qc.cancelQueries({ queryKey: ["posts"] });
      const previous = qc.getQueryData<PostType[]>(["posts"]);
      qc.setQueryData<PostType[]>(["posts"], (old) =>
        old?.map((p) => (p.id === updated.id ? updated : p))
      );
      return { previous };
    },
    onError: (_err, _updated, ctx) => {
      if (ctx?.previous) qc.setQueryData(["posts"], ctx.previous);
      message.error("Failed to update post");
    },
    onSuccess: () => {
      message.success("Post updated successfully");
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
      const previous = qc.getQueryData<PostType[]>(["posts"]);
      qc.setQueryData<PostType[]>(["posts"], (old) =>
        old?.filter((p) => p.id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(["posts"], ctx.previous);
      message.error("Failed to delete post");
    },
    onSuccess: () => {
      message.success("Post deleted successfully");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
}
