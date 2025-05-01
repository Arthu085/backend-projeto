import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useStateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // Lógica de autenticação futura
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin
  };
}