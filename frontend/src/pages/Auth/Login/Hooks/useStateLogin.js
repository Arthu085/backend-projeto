// useStateLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useStateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha no login");
      }

      const data = await response.json();
      console.log("Token JWT recebido:", data.token);

      // Exemplo: salva token no localStorage e navega para outra página
      localStorage.setItem("token", data.token);
      navigate("/dashboard"); // ou outra rota protegida

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha inválidos!");
    }
  };

  return { email, setEmail, password, setPassword, handleLogin };
}
