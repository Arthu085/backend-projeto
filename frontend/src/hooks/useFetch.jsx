import axios from "axios";

export const fetchUserData = async (token) => {
	try {
		const response = await axios.get("http://localhost:8000/user/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error("Erro ao buscar dados do usuário: " + error.message);
	}
};

export const fetchSuggestionUser = async (token) => {
	try {
		const response = await axios.get(
			"http://localhost:8000/recommendation/fetch",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		throw new Error(
			"Erro ao buscar recomendações para esse usuário: " + error.message
		);
	}
};

export const fetchHabitUser = async (token) => {
	try {
		const response = await axios.get("http://localhost:8000/habit/fetch", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(
			"Erro ao buscar hábitos para esse usuário: " + error.message
		);
	}
};

export const fetchRecordUser = async (token) => {
	try {
		const response = await axios.get("http://localhost:8000/record/fetch", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(
			"Erro ao buscar hábitos feitos para esse usuário: " + error.message
		);
	}
};
