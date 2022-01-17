const User = require("../models/user");
const minifaker = require("minifaker");
require("minifaker/locales/en");

exports.create = async (req, res) => {
	const users = [];

	const { count } = req.body;

	try {
		for (let i = 0; i < count; i++) {
			const user = {
				firstName: minifaker.firstName(),
				lastName: minifaker.lastName(),
				email: minifaker.email(),
				job: minifaker.jobTitle(),
			};

			users.push(user);
		}

		await User.insertMany(users);

		res.status(200).json({
			message: `${count} user(s) created`,
		});
	} catch (error) {
		res.status(500).json({
			error: `Error creating user(s): ${error.message}`,
		});
	}
};
