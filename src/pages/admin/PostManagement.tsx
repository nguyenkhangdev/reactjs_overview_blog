import { useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../../api/postApi";
import type { PostType } from "../../types/post.types";

export default function PostManagement() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);
  const [form] = Form.useForm();

  // GET posts
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post created successfully");
    },
  });

  // UPDATE
const updateMutation = useMutation({
  mutationFn: (data: PostType) => {
    const { id, ...rest } = data;  // bỏ id khỏi body
    return updatePost(id, rest);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    message.success("Post updated successfully");
  },
});

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      message.success("Post deleted successfully");
    },
  });

  // Handle open modal
  const openModal = (post?: PostType) => {
    if (post) {
      setEditingPost(post);
      form.setFieldsValue(post);
    } else {
      setEditingPost(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  // Handle form submit
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        updateMutation.mutate({ ...editingPost, ...values });
      } else {
        createMutation.mutate(values);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    {
      title: "Actions",
      render: (_: any, record: PostType) => (
        <Space>
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure delete this post?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Post Management</h2>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Add Post
      </Button>
      <Table
        dataSource={posts}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      {/* Modal form */}
      <Modal
        title={editingPost ? "Edit Post" : "Add Post"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
