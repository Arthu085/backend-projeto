import React from "react";
import LoginForm from "./Components/LoginForm";
import useStateLogin from "./Hooks/useStateLogin";

export default function Login() {
  const { email, setEmail, password, setPassword, handleLogin } = useStateLogin();

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}