export const read = async (skip) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL}/posts?skip=${skip}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);

		return await res.json();
	} catch (error) {
		throw new Error(error);
	}
};
