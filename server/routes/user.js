const express = require("express");
const router = express.Router();

// import controllers
const { create } = require("../controllers/user");

// api routes
router.post("/users", create);

module.exports = router;
