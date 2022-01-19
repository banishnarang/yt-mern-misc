export const create = async (count) => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ count }),
		});

		return await res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};

export const read = async ({ page, perPage } = {}) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/users?page=${page}&perPage=${perPage}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		);

		return await res.json();
	} catch (error) {
		throw new Error(error.message);
	}
};
