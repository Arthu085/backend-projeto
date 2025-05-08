import { useState, useEffect } from "react";
import MainLayout from "../../Components/Layout/MainLayout";
import HabitSuggestion from "../../API/Utils/HabitSuggestion";
import Card from "../../Components/UI/Card";
import axios from "axios";
import { fetchUserData, fetchSuggestionUser } from "../../hooks/useFetch";

const Suggestions = () => {
	const [usuario, setUsuario] = useState({
		nome: "",
		cidade: "",
		habitos: [],
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadUserData = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Usuário não autenticado.");
			}

			const data = await fetchUserData(token);
			setUsuario((prev) => ({
				...prev,
				nome: data.name,
				cidade: data.city,
			}));
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	const loadSuggestionUser = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Usuário não autenticado.");
			}

			const data = await fetchSuggestionUser(token);
			setUsuario((prev) => ({
				...prev,
				habitos: data || [],
			}));
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadUserData();
		loadSuggestionUser();
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
								<ul className="list-disc pl-5 ">
									{usuario.habitos.map((habito, index) => (
										<div className="bg-gray-200 p-1 rounded-lg mb-2">
											<li key={index} className="mb-2">
												{habito.description}
											</li>
										</div>
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
								Aqui estão algumas sugestões de hábitos para você na cidade de{" "}
								{usuario.cidade}.
							</p>
							<HabitSuggestion onSuccess={loadSuggestionUser} />
						</Card>
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default Suggestions;
