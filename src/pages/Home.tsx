import { useQuery } from "@tanstack/react-query";
import type { PostType } from "../types/post.types";
import { getPosts } from "../api/postApi";
import { Card, List } from "antd";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading, isError } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

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
        </List.Item>
      )}
    />
  );
}
