import axios from "axios";

export const editHabitUser = async (token, id, name, id_type) => {
	try {
		const payload = {};
		if (name) payload.name = name;
		if (id_type) payload.id_type = id_type;

		const response = await axios.put(
			`http://localhost:8000/habit/edit/${id}`,
			payload,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		throw new Error("Erro ao editar hábito: " + error.message);
	}
};
