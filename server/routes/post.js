const express = require("express");
const router = express.Router();

// import controllers
const { create, read } = require("../controllers/post");

// import middlewares

// api routes
router.post("/posts", create);
router.get("/posts", read);

module.exports = router;
