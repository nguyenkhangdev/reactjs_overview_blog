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
  });

  const onFinish = (values: SigninType) => {
    mutation.mutate(values, {
      onSuccess: (data) => {
        message.success(data.message);
        console.log("token", data.data);
        localStorage.setItem("auth-token", data.data.token);
        setAuthUser(data.data.user);
        navigate("/");
      },
      onError: () => {
        message.error("Invalid email or password");
      },
    });
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
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            block
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
