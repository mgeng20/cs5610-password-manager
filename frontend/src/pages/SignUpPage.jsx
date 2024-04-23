import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignUpPage = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [messageApi, messageHolder] = message.useMessage();
  const navigate = useNavigate();

  function setUsername(event) {
    const username = event.target.value;
    setUsernameInput(username);
  }

  function setPassword(event) {
    const pswd = event.target.value;
    setPasswordInput(pswd);
  }

  async function handleSignup() {
    try {
      const res = await axios.post("/api/auth/register", {
        username: usernameInput,
        password: passwordInput,
      });
      messageApi.success("Signup successful");
      navigate("/login"); // Adjust the route as per your application
    } catch (error) {
      messageApi.error(
        "Signup failed. Please check your details.",
        error.response.data.message
      );
    }
}

  return (
    <>
      <NavBar />

      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 480,
          margin: "auto",
          paddingTop: 200,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username.",
            },
          ]}
        >
          <Input value={usernameInput} onChange={setUsername} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password.",
            },
          ]}
        >
          <Input.Password value={passwordInput} onChange={setPassword} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSignup}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </>

    // <Link to={"/login"}>
    //   <Button>Back to Login</Button>
    // </Link>
  );
};

export default SignUpPage;