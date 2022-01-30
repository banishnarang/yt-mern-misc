const express = require("express");
const router = express.Router();

// import controllers
const { create } = require("../controllers/post");

// import middlewares

// api routes
router.post("/posts", create);

module.exports = router;
