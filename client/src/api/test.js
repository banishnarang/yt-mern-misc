export const getTest = async () => {
	try {
		const res = await fetch(`${process.env.REACT_APP_API_URL}/test`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		return await res.json();
	} catch (err) {}
};
