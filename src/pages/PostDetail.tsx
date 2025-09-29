import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Typography } from "antd";
import { getPost } from "../api/postApi";

const { Title, Paragraph } = Typography;

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, isFetching, error } = useQuery({
    queryKey: ["post", id], // unique cache key
    queryFn: () => getPost(id!), // fetch single post by id

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
    <Card style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>{data.title}</Title>
      <Paragraph>{data.content}</Paragraph>

      {isFetching && (
        <p style={{ color: "gray" }}>Refreshing in background...</p>
      )}
    </Card>
  );
}
