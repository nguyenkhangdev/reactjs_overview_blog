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
import type { PostType } from "../../types/post.types";
import {
  usePosts,
  useCreatePost,
  useUpdatePost,
  useDeletePost,
} from "../../hooks/usePosts";

export default function PostManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostType | null>(null);
  const [form] = Form.useForm();

  // Hooks
  const { data: posts, isLoading } = usePosts();
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();

  // Open modal
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

  // Handle submit
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingPost) {
        updateMutation.mutate(
          { ...editingPost, ...values },
          {
            onSuccess: () => {
              message.success("Post updated successfully");
              setIsModalOpen(false);
              form.resetFields();
            },
          }
        );
      } else {
        createMutation.mutate(values, {
          onSuccess: () => {
            message.success("Post created successfully");
            setIsModalOpen(false);
            form.resetFields();
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => message.success("Post deleted successfully"),
    });
  };

  // Table columns
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Content", dataIndex: "content", ellipsis: true },
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
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Form */}
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
