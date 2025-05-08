import React, { useEffect, useState } from "react";
import Card from "../../Components/UI/Card";
import MainLayout from "../../Components/Layout/MainLayout";
import {
	fetchHabitUser,
	fetchRecordUser,
	fetchSuggestionUser,
} from "../../hooks/useFetch";

export default function Dashboard() {
	const [habits, setHabits] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [records, setRecords] = useState([]);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const loadHabitUser = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Usuário não autenticado.");
			}

			const data = await fetchHabitUser(token);
			setHabits(data);
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
			setSuggestions(data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

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
				<Card title="Recent Activity">
					<div className="space-y-4">
						{[1, 2, 3, 4, 5].map((item) => (
							<div
								key={item}
								className="flex items-start pb-4 border-b border-gray-100 last:border-0">
								<div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
									{item}
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium">Activity {item}</p>
									<p className="text-sm text-gray-500">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									</p>
									<p className="text-xs text-gray-400 mt-1">2 hours ago</p>
								</div>
							</div>
						))}
					</div>
				</Card>
			</div>
		</MainLayout>
	);
}
