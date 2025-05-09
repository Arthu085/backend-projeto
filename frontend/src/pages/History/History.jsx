import { useEffect, useState } from "react";
import MainLayout from "../../Components/Layout/MainLayout";
import Card from "../../Components/UI/Card";
import Alert from "../../Components/UI/Alert";
import { fetchRecordUser } from "../../hooks/useFetch";
import { deleteRecordUser } from "../../hooks/useDelete";
import Button from "../../Components/UI/Button";

export default function History() {
	const [records, setRecords] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [deletingHabitId, setDeletingHabitId] = useState(null);

	const token = localStorage.getItem("token");

	const loadRecordUser = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Usuário não autenticado.");
			}

			const data = await fetchRecordUser(token);
			setRecords(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRecordUser();
	}, []);

	return (
		<MainLayout>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">
					Histórico de Hábitos Concluídos
				</h1>

				{loading && <p>Carregando...</p>}

				{error && (
					<Alert type="error" className="mb-4">
						{error}
					</Alert>
				)}

				{records.length === 0 && !loading && !error ? (
					<p>Você ainda não possui hábitos concluídos.</p>
				) : (
					<div className="space-y-4">
						{records.map((rec) => (
							<Card key={rec.id}>
								<div className="flex justify-between items-start">
									<div className="space-y-2">
										<p className="text-gray-800">{rec.habitName}</p>
										<p className="text-gray-800">
											{new Date(rec.datePerformed).toLocaleString("pt-BR", {
												day: "2-digit",
												month: "2-digit",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
										<p className="text-sm text-gray-500">
											Usuário: {rec.userName}
										</p>
									</div>
									<Button
										variant="danger"
										size="sm"
										disabled={deletingHabitId === rec.id}
										onClick={async () => {
											setDeletingHabitId(rec.id);
											try {
												await deleteRecordUser(token, rec.id);
												alert("Gravação de hábito deletada com sucesso!");
												const updatedRecords = await fetchRecordUser(token);
												setRecords(updatedRecords);
											} catch (error) {
												alert(
													"Erro ao deletar gravação de hábito: " + error.message
												);
											} finally {
												setDeletingHabitId(null);
											}
										}}>
										{deletingHabitId === rec.id ? "Excluindo..." : "Excluir"}
									</Button>
								</div>
							</Card>
						))}
					</div>
				)}
			</div>
		</MainLayout>
	);
}
