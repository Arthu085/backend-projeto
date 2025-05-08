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
		throw new Error("Erro ao buscar usuário: " + error.message);
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
		throw new Error("Erro ao buscar usuário: " + error.message);
	}
};
