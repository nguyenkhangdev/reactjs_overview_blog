import { Form, Input, Button, Card, message, Typography } from "antd";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/authApi";
import type { SigninType } from "../types/user.types";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authUserState } from "../store/authAtom";

const { Title } = Typography;

export default function SignIn() {
  const navigate = useNavigate();
  const setAuthUser = useSetRecoilState(authUserState);

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      message.success(data.message);
      localStorage.setItem("auth-token", data.data.token);
      setAuthUser(data.data.user);
      navigate("/");
    },
    onError: (error: any) => {
      message.error(
        error?.response?.data?.message || "Invalid email or password"
      );
    },
  });

  const onFinish = (values: SigninType) => {
    mutation.mutate(values);
  };

  return (
    <Card style={{ maxWidth: 400, margin: "50px auto" }}>
      <Title level={3}>Sign In</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input autoComplete="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
