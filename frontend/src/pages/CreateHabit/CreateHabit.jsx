import React, { useState } from "react";
import MainLayout from "../../Components/Layout/MainLayout";
import Card from "../../Components/UI/Card";
import Input from "../../Components/UI/Input";
import Button from "../../Components/UI/Button";
import { createHabitUser } from "../../hooks/useCreate";

const CreateHabit = () => {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState("");
	const [type, setType] = useState("");

	const habitTypes = [
		{ id: 1, value: "saúde", label: "Saúde" },
		{ id: 2, value: "produtividade", label: "Produtividade" },
		{ id: 3, value: "emocional", label: "Emocional" },
		{ id: 4, value: "hobby", label: "Hobby" },
		{ id: 5, value: "sono", label: "Sono" },
		{ id: 6, value: "espiritual", label: "Espiritual" },
		{ id: 7, value: "social", label: "Social" },
		{ id: 8, value: "autocuidado", label: "Autocuidado" },
		{ id: 9, value: "criatividade", label: "Criatividade" },
		{ id: 10, value: "aprendizado", label: "Aprendizado" },
	];

	const handleCreateHabit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = localStorage.getItem("token");
			const selectedType = habitTypes.find((t) => t.value === type)?.id;
			if (!selectedType) throw new Error("Tipo de hábito inválido.");

			await createHabitUser(token, name, selectedType);
			alert("Hábito cadastrado com sucesso!");
			setName("");
			setType("");
		} catch (error) {
			alert("Erro ao cadastrar hábito: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<MainLayout>
			<Card title="Cadastrar hábito">
				<form onSubmit={handleCreateHabit}>
					<div className="space-y-3 mb-4">
						<Input
							label="Nome do hábito"
							placeholder="Digite o nome do hábito"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-medium text-gray-700">
								Tipo do hábito <span className="text-red-500">*</span>
							</label>
							<select
								required
								value={type}
								onChange={(e) => setType(e.target.value)}
								className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
								<option value="">Selecione um tipo</option>
								{habitTypes.map((type) => (
									<option key={type.id} value={type.value}>
										{type.label}
									</option>
								))}
							</select>
						</div>
					</div>
					<Button type="submit" disabled={loading} className="w-full">
						{loading ? "Criando..." : "Cadastrar"}
					</Button>
				</form>
			</Card>
		</MainLayout>
	);
};

export default CreateHabit;
