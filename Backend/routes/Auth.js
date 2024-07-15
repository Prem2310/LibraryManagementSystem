const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { signUp, login, clerkSignup } = require("../controllers/Auth");

//Route for login
router.post("/login", login);

// Route for user signup
router.post("/signup", signUp);
router.post("/clerkSignup", clerkSignup);

module.exports = router;
