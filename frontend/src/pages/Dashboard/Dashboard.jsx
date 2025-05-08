import React, { useEffect, useState } from "react";
import Card from "../../Components/UI/Card";
import MainLayout from "../../Components/Layout/MainLayout";
import {
	fetchHabitUser,
	fetchRecordUser,
	fetchSuggestionUser,
} from "../../hooks/useFetch";
import Button from "../../Components/UI/Button";
import { createRecordUser } from "../../hooks/useCreate";
import { deleteHabitUser } from "../../hooks/useDelete";
import { useNavigate } from "react-router-dom";
import Alert from "../../Components/UI/Alert";

export default function Dashboard() {
	const [habits, setHabits] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [records, setRecords] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [loadingHabitId, setLoadingHabitId] = useState(null);
	const [deletingHabitId, setDeletingHabitId] = useState(null);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setError("Usuário não autenticado.");
			setLoading(false);
			return;
		}

		Promise.allSettled([
			fetchHabitUser(token),
			fetchRecordUser(token),
			fetchSuggestionUser(token),
		])
			.then(([habitRes, recordRes, suggestionRes]) => {
				if (habitRes.status === "fulfilled") setHabits(habitRes.value);
				if (recordRes.status === "fulfilled") setRecords(recordRes.value);
				if (suggestionRes.status === "fulfilled")
					setSuggestions(suggestionRes.value);
			})
			.catch((err) => setError("Erro ao carregar dados"))
			.finally(() => setLoading(false));
	}, []);

	return (
		<MainLayout>
			{loading && <p>Carregando...</p>}

			{error && (
				<Alert type="error" className="mb-4">
					{error}
				</Alert>
			)}
			<div className="space-y-6">
				{/* Dashboard Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card className="bg-blue-50 border-l-4 border-blue-500">
						<div className="flex items-center">
							<div className="ml-4">
								<p className="text-sm font-medium text-blue-500">
									Total de hábitos
								</p>
								<p className="text-2xl font-semibold text-blue-700">
									{habits.length}
								</p>
							</div>
						</div>
					</Card>

					<Card className="bg-green-50 border-l-4 border-green-500">
						<div className="flex items-center">
							<div className="ml-4">
								<p className="text-sm font-medium text-green-500">
									Total de hábitos concluídos
								</p>
								<p className="text-2xl font-semibold text-green-700">
									{records.length}
								</p>
							</div>
						</div>
					</Card>

					<Card className="bg-purple-50 border-l-4 border-purple-500">
						<div className="flex items-center">
							<div className="ml-4">
								<p className="text-sm font-medium text-purple-500">
									Total de sugestões
								</p>
								<p className="text-2xl font-semibold text-purple-700">
									{suggestions.length}
								</p>
							</div>
						</div>
					</Card>
				</div>

				{/* Recent Activity */}
				<Card
					title="Hábitos cadastrados"
					footer={
						<Button
							variant="primary"
							size="sm"
							onClick={() => navigate("/dashboard/create")}>
							Cadastrar
						</Button>
					}>
					<div className="space-y-4">
						{habits.length === 0 && !loading && !error ? (
							<p>Você ainda não possui hábitos cadastrados.</p>
						) : (
							habits.map((habit, index) => (
								<div
									key={habit.id}
									className="flex items-center pb-4 border-b border-gray-100 last:border-0">
									<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
										{index + 1}
									</div>
									<div className="ml-4">
										<p className="text-sm font-medium">
											Nome do hábito: {habit.name}
										</p>
										<p className="text-sm text-gray-500">
											Tipo de hábito: {habit.typeName}
										</p>
									</div>
									<div className="flex ml-auto gap-2">
										<Button
											variant="success"
											size="sm"
											disabled={loadingHabitId === habit.id}
											onClick={async () => {
												setLoadingHabitId(habit.id);
												try {
													await createRecordUser(token, habit.id);
													const updatedRecords = await fetchRecordUser(token);
													setRecords(updatedRecords);
													alert("Hábito marcado como concluído!");
												} catch (error) {
													alert("Erro ao concluir hábito: " + error.message);
												} finally {
													setLoadingHabitId(null);
												}
											}}>
											{loadingHabitId === habit.id
												? "Concluindo..."
												: "Concluído"}
										</Button>
										<Button
											variant="primary"
											size="sm"
											onClick={() => navigate(`/dashboard/edit/${habit.id}`)}>
											Editar
										</Button>
										<Button
											variant="danger"
											size="sm"
											disabled={deletingHabitId === habit.id}
											onClick={async () => {
												setDeletingHabitId(habit.id);
												try {
													await deleteHabitUser(token, habit.id);
													alert("Hábito deletado com sucesso!");
													const updatedHabits = await fetchHabitUser(token);
													setHabits(updatedHabits);
													const updatedRecords = await fetchRecordUser(token);
													setRecords(updatedRecords);
												} catch (error) {
													alert("Erro ao deletar hábito: " + error.message);
												} finally {
													setDeletingHabitId(null);
												}
											}}>
											{deletingHabitId === habit.id
												? "Excluindo..."
												: "Excluir"}
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</Card>
			</div>
		</MainLayout>
	);
}
