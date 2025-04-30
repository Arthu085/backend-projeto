import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
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

  return (
    <div className="screen-center">
      <form onSubmit={handleLogin} className="card">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <label className="label-base" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="input-base mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label-base" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="input-base mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>

        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}
