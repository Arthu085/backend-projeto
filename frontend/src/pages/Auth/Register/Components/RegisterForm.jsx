import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../Components/UI/Input";
import Button from "../../../../Components/UI/Button";
import Alert from "../../../../Components/UI/Alert";

export default function RegisterForm({
	name,
	setName,
	email,
	setEmail,
	city,
	setCity,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	errors,
	handleRegister,
	isLoading,
	formError,
}) {
	const navigate = useNavigate();

	return (
		<form onSubmit={handleRegister} className="space-y-6">
			{formError && <Alert type="error">{formError}</Alert>}

			<Input
				id="name"
				label="Nome Completo"
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="John Doe"
				error={errors.name}
				required
			/>

			<Input
				id="email"
				label="Email"
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="john@example.com"
				error={errors.email}
				required
			/>

			<Input
				id="password"
				label="Senha"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="********"
				error={errors.password}
				required
			/>

			<Input
				id="confirmPassword"
				label="Confirmar senha"
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="********"
				error={errors.confirmPassword}
				required
			/>

			<Input
				id="city"
				label="Cidade"
				type="text"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				placeholder="São Paulo"
				error={errors.city}
				required
			/>

			<div className="flex items-center">
				<input
					id="terms"
					name="terms"
					type="checkbox"
					required
					className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
				/>
				<label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
					I agree to the{" "}
					<a href="#" className="text-blue-600 hover:text-blue-500">
						Terms of Service
					</a>{" "}
					and{" "}
					<a href="#" className="text-blue-600 hover:text-blue-500">
						Privacy Policy
					</a>
				</label>
			</div>

			<div>
				<Button type="submit" variant="primary" fullWidth disabled={isLoading}>
					{isLoading ? "Creating Account..." : "Create Account"}
				</Button>
			</div>

			<div className="text-center mt-4">
				<p className="text-sm text-gray-600">
					Já possui uma conta?{" "}
					<button
						type="button"
						className="text-blue-600 font-medium hover:text-blue-500 cursor-pointer"
						onClick={() => navigate("/")}>
						Entrar
					</button>
				</p>
			</div>
		</form>
	);
}
