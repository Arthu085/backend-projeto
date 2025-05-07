// imports
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getSugestaoHabito } from "../../API/google";
import Button from "../../Components/UI/Button";
import Card from "../../Components/UI/Card";
import Input from "../../Components/UI/Input";
import Alert from "../../Components/UI/Alert";

const HabitSuggestion = () => {
	const [loading, setLoading] = useState(false);
	const [salvando, setSalvando] = useState(false);
	const [sugestao, setSugestao] = useState("");
	const [erro, setErro] = useState("");

	const [estadoEmocional, setEstadoEmocional] = useState("");
	const [clima, setClima] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
	}, []);

	const salvarRecomendacao = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Usuário não autenticado.");

			const response = await fetch(
				"http://localhost:8000/recommendation/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						description: sugestao,
					}),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					errorText || `Erro ao salvar recomendação: ${response.status}`
				);
			}

			alert("Recomendação salva com sucesso!");
		} catch (error) {
			console.error(error);
			setErro(error.message);
		}
	};

	const handleGetSugestao = async (e) => {
		e.preventDefault();
		setErro("");
		setLoading(true);

		try {
			if (!estadoEmocional || !clima) {
				throw new Error("Preencha todos os campos.");
			}

			const resposta = await getSugestaoHabito(estadoEmocional, clima);
			setSugestao(resposta);
		} catch (error) {
			setErro(error.message || "Erro ao obter sugestão.");
		} finally {
			setLoading(false);
		}
	};

	const handleSalvar = async () => {
		if (!sugestao) return;

		setSalvando(true);
		setErro("");
		await salvarRecomendacao();
		setSalvando(false);
	};

	return (
		<Card>
			<h2 className="text-xl font-bold mb-4">Sugestão de Hábito (Google AI)</h2>

			<form onSubmit={handleGetSugestao}>
				<div className="space-y-3 mb-4">
					<Input
						label="Como você está se sentindo?"
						value={estadoEmocional}
						onChange={(e) => setEstadoEmocional(e.target.value)}
						required
					/>
					<Input
						label="Como está o clima?"
						value={clima}
						onChange={(e) => setClima(e.target.value)}
						required
					/>
				</div>

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Gerando..." : "Obter Sugestão"}
				</Button>
			</form>

			{erro && (
				<Alert type="error" className="mt-4">
					{erro}
				</Alert>
			)}

			{sugestao && !erro && (
				<div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
					<h3 className="font-medium text-green-800 mb-2">Sugestão:</h3>
					<p className="text-gray-800">{sugestao}</p>
					<div className="mt-3 flex justify-end">
						<Button
							type="button"
							variant="outline"
							onClick={handleSalvar}
							disabled={salvando}>
							{salvando ? "Salvando..." : "Salvar"}
						</Button>
					</div>
				</div>
			)}
		</Card>
	);
};

export default HabitSuggestion;
