import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { auth } from "../../services/apiAuth";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";


function LoginForm() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("test1234");
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ endpoint, options }) => auth(endpoint, options),
    onSuccess: (data) => {
      navigate("/");
      localStorage.setItem('user',JSON.stringify(data.user));
      
    },
    onError: () => {
      toast.error("Invalid credentials!");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    mutate({ endpoint: "login", options: option });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{!isLoading ? "Login" : <SpinnerMini />}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
