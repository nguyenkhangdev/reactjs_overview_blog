import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, Typography } from "antd";
import { getPost } from "../api/postApi";

const { Title, Paragraph } = Typography;

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

  if (!data) return <div>Post not found</div>;

  return (
    <Card style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={3}>{data.title}</Title>
      <Paragraph>{data.content}</Paragraph>
    </Card>
  );
}
