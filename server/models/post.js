const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	username: String,
	avatar: String,
	image: String,
	caption: String,
});

module.exports = mongoose.model("Post", postSchema);
