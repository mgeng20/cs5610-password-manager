import { Button, Form, Input, message } from "antd";
import { AxiosError } from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/logo-with-name.png";
import { apiServer } from "../util";

type FormDataType = {
  email?: string;
  password?: string;
};

function LoginPage() {
  const [messageApi, messageHolder] = message.useMessage();
  const navigate = useNavigate();

  return (
    <div>
      {messageHolder}
      <Form<FormDataType>
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        className="login-form"
        onFinish={(formData) => {
          const { email, password } = formData;

          apiServer
            .post("/login", { email, password })
            .then((res) => {
              const { access_token } = res.data;
              sessionStorage.setItem("access_token", access_token);
              messageApi.success("Login success");
              navigate("/process-payment");
            })
            .catch((err: AxiosError) => {
              if (err.response?.status == 401) {
                messageApi.error("Login failed");
                return;
              }
              messageApi.error(err.message);
            });
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <img src={logo} alt="Logo" width={564} height={134} />
        </div>
        <Form.Item<FormDataType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FormDataType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to={"/signup"}>
            <Button>Sign up</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
