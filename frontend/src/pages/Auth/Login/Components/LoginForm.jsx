import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
	email,
	setEmail,
	password,
	setPassword,
	handleLogin,
}) {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-400">
			<div className="p-8 bg-white rounded shadow-md w-96">
				<h2 className="mb-6 text-2xl font-bold text-center">Entrar</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="email">
							Email
						</label>
						<input
							className="w-full px-3 py-2 border rounded  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu email"
						/>
					</div>
					<div className="mb-6">
						<label
							className="block mb-2 text-sm font-bold text-gray-700"
							htmlFor="password">
							Senha
						</label>
						<input
							className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Digite sua senha"
						/>
					</div>
					<button
						className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 cursor-pointer"
						type="submit">
						Entrar
					</button>
				</form>
				<div className="mt-4 text-center">
					<p>
						Não possui uma conta?{" "}
						<button
							className="text-blue-500 hover:underline cursor-pointer"
							onClick={() => navigate("/register")}>
							Registrar
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
