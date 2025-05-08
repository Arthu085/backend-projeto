import axios from "axios";

export const deleteHabitUser = async (token, id) => {
	try {
		const response = await axios.delete(
			`http://localhost:8000/habit/delete/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao deletar hábito: " + error.message);
	}
};

export const deleteRecordUser = async (token, id) => {
	try {
		const response = await axios.delete(
			`http://localhost:8000/record/delete/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao deletar gravação de hábito: " + error.message);
	}
};
