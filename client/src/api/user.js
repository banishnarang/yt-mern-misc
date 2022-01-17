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
