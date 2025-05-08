import axios from "axios";

export const createRecordUser = async (token, id_habit) => {
	try {
		const response = await axios.post(
			"http://localhost:8000/record/create",
			{ id_habit }, // corpo da requisição
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao marcar hábito como concluído: " + error.message);
	}
};
