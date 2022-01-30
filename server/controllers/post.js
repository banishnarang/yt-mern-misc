const Post = require("../models/post");
const minifaker = require("minifaker");
require("minifaker/locales/en");

// @route   GET /posts
// @desc    Get all posts
// @access  Public
exports.read = async (req, res) => {
	const skip = req.query.skip ? Number(req.query.skip) : 0;
	const DEFAULT_LIMIT = 10;

	try {
		const posts = await Post.find({}).skip(skip).limit(DEFAULT_LIMIT);

		res.status(200).json({
			success: true,
			data: posts,
		});
	} catch (error) {
		res.status(400).json({
			error: `Error getting posts: ${error.message}`,
		});
	}
};

// @route   POST /posts
// @desc    Create {total} posts
// @access  Public
exports.create = async (req, res) => {
	const { total } = req.body;
	const posts = [];

	try {
		const compilePosts = async (_) => {
			for (let index = 0; index < total; index++) {
				// random number between 1 to 70
				const randomAvatarNum = Math.floor(Math.random() * 70) + 1;
				const randomImageNum = Math.floor(Math.random() * 70) + 1;

				const post = new Post({
					username: minifaker.username(),
					avatar: `https://i.pravatar.cc/150?img=${randomAvatarNum}`,
					image: `https://i.pravatar.cc/600?img=${randomImageNum}`,
					caption: `${minifaker.word()} ${minifaker.word()} ${minifaker.cityName()}`,
				});

				posts.push(post);
			}
		};

		await compilePosts();
		await Post.insertMany(posts);

		res.status(201).json({
			success: true,
		});
	} catch (error) {
		res.status(400).json({
			error: `Error create posts: ${error.message}`,
		});
	}
};
