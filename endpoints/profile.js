// import dependencies
// load models
const router = require("express").Router();
const passport = require("passport");

// load controllers
const profileControllers = require("../controllers/profile");

// routes

// @route GET api/profile
// @desc returns current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileControllers.getProfile
);

// @route POST api/profile
// @desc creates user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileControllers.postProfile
);

// @route GET api/profile/handle/:handle
// @desc shows user profile by handle
// @access Public
router.get("/handle/:handle", profileControllers.getProfileByHandle);

// @route GET api/profile/user/:user_id
// @desc shows user profile by user id
// @access Public
router.get("/user/:user_id", profileControllers.getProfileByUserId);

// @route GET api/profile/all
// @desc get all profile
// @access Public
router.get("/all", profileControllers.getAllProfile);

// @route POST api/profile/experience
// @desc add users experiences to profile
// @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileControllers.postAddExperience
);

// @route POST api/profile/education
// @desc add user education to profile
// @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileControllers.postAddEducation
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete experience from profile
// @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileControllers.DeleteExperience
);

// @route DELETE api/profile/education/:ed_id
// @desc Delete education from profile
// @access Private
router.delete(
  "/education/:ed_id",
  passport.authenticate("jwt", { session: false }),
  profileControllers.DeleteEducation
);

// @route DELETE api/profile
// @desc Delete user and related profile
// @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileControllers.DeleteProfile
);

module.exports = router;
