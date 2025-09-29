import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../types/post.types";
import { getPosts } from "../api/postApi";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading, isError, isFetching, error } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getPosts,

    // --- caching & freshness config ---
    staleTime: 1000 * 60, // 1 min: consider data "fresh"
    gcTime: 1000 * 60 * 10, // 10 min: keep inactive data in cache
    refetchOnMount: true, // refetch when remount if data is stale
    refetchOnWindowFocus: true, // refetch when window regains focus
    refetchOnReconnect: true, // refetch when network reconnects
    retry: 1, // retry once if fetch fails
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;
  if (!data) return <div>Post not found</div>;

  return (
    <List
      grid={{ gutter: 16, column: 2 }}
      dataSource={data}
      renderItem={(post) => (
        <List.Item key={post.id}>
          <Card title={post.title}>
            <p>{post.content.slice(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>Đọc tiếp</Link>
          </Card>
          {isFetching && (
            <p style={{ color: "gray" }}>Refreshing in background...</p>
          )}
        </List.Item>
      )}
    />
  );
}
