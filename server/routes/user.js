const express = require("express");
const router = express.Router();

// import controllers
const { create, read } = require("../controllers/user");

// api routes
router.post("/users", create);
router.get("/users", read);

module.exports = router;
