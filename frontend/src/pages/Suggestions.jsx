import { useState, useEffect } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import HabitSuggestion from "../API/Utils/HabitSuggestion";
import Card from "../Components/UI/Card";
import axios from "axios"; // Make sure axios is installed

const Suggestions = () => {
	// State for user info
	const [usuario, setUsuario] = useState({
		nome: "",
		cidade: "",
		habitos: [],
	});

	// State for loading and error handling
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch user data on component mount
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				// Get the JWT token from local storage
				const token = localStorage.getItem("token");

				if (!token) {
					throw new Error("Usuário não autenticado");
				}

				// Make API request with the token in Authorization header
				const response = await axios.get("http://localhost:8000/user/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				// Update state with user data
				setUsuario({
					nome: response.data.name,
					cidade: response.data.city,
					habitos: response.data.habits || [],
				});

				setLoading(false);
			} catch (err) {
				console.error("Erro ao buscar dados do usuário:", err);
				setError(
					"Não foi possível carregar seus dados. Por favor, tente novamente."
				);
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	return (
		<MainLayout>
			<div className="container mx-auto p-4">
				<h1 className="text-2xl font-bold mb-6">
					Recomendações Personalizadas
				</h1>

				{loading ? (
					<p>Carregando...</p>
				) : error ? (
					<p className="text-red-500">{error}</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Card>
							<h2 className="text-xl font-semibold mb-3">
								Seus Hábitos Salvos
							</h2>
							{usuario.habitos && usuario.habitos.length > 0 ? (
								<ul className="list-disc pl-5">
									{usuario.habitos.map((habito, index) => (
										<li key={index} className="mb-2">
											{habito.descricao}
										</li>
									))}
								</ul>
							) : (
								<p>
									Você ainda não tem hábitos salvos. Use o formulário ao lado
									para receber sugestões personalizadas!
								</p>
							)}
						</Card>

						<Card>
							<h2 className="text-xl font-semibold mb-3">
								Olá, {usuario.nome}!
							</h2>
							<p className="mb-3">
								Aqui estão algumas sugestões de hábitos para você em{" "}
								{usuario.cidade}.
							</p>
							<HabitSuggestion />
						</Card>
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default Suggestions;
