const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { signUp, login } = require("../controllers/Auth");

//Route for login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);

module.exports = router;
