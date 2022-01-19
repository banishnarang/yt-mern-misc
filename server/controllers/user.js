const User = require("../models/user");
const minifaker = require("minifaker");
require("minifaker/locales/en");

exports.read = async (req, res) => {
	const page = req.query.page || 1;
	const perPage = req.query.perPage || 5;

	try {
		const count = await User.countDocuments({});

		const users = await User.find({})
			.sort({ firstName: 1, lastName: 1 })
			.skip((page - 1) * parseInt(perPage))
			.limit(parseInt(perPage));

		// success
		res.status(200).json({
			count,
			users,
		});
	} catch (error) {
		res.status(400).json({
			error: `Error getting data: ${error.message}`,
		});
	}
};

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
