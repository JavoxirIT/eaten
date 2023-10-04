import { Button, Form, Input, message, Row } from "antd";
import { useAuthHeader, useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginForm = () => {
  const authHeader = useAuthHeader();
  axios.defaults.baseURL = process.env.REACT_APP_URL;
  axios.defaults.headers.common["Authorization"] = authHeader();
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    axios
      .post("/login", values)
      .then((data) => {
        if (
          signIn({
            token: data.data.access_token,
            expiresIn: data.data.expires_in,
            tokenType: data.data.token_type,
            authState: data.data.user,
          })
        ) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((data) => {
        messageApi.open({
          type: "error",
          content: data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          name="login"
          rules={[
            {
              required: true,
              message: "Iltimos loginni  kiriting",
            },
          ]}
        >
          <Input placeholder="Login" style={style.inputStyle} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Iltimos parolni kiriting",
            },
          ]}
        >
          <Input.Password placeholder="Parol" style={style.inputStyle} />
        </Form.Item>

        <Row justify="end">
          <Form.Item>
            <Button type="primary" htmlType="submit" style={style.button}>
              KIRISH
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

const style = {
  inputStyle: { padding: "15px 10px", fontSize: 20, marginBlock: 10 },
  button: { padding: "20px 30px", fontSize: 20 },
};
