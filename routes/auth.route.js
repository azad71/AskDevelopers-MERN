const express = require("express");
const router = express.Router();
const passport = require("passport");
const authControllers = require("../controllers/auth.controller");

// @route POST api/auth/signup
// @desc Sign up user
// @access Public
router.post("/auth/signup", authControllers.postSignUp);

// @route POST api/auth/login
// @desc Login user and returns JWT tokens
// @access Public
router.post("/auth/login", authControllers.postLogin);

// @route GET api/current
// @desc returns current user
// @access Public
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  authControllers.getCurrentUser
);

module.exports = router;
