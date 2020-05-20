// importing dependencies
// load libraries
const router = require("express").Router();
const passport = require("passport");

// load controllers
const postControllers = require("../controllers/post");

// @route GET api/posts
// @desc Get posts
// @access Public
router.get("/", postControllers.getPosts);

// @route GET api/posts/:post_id
// @desc Get post by post id
// @access Public
router.get("/:post_id", postControllers.getPost);

// @route POST api/posts
// @desc Create post
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postControllers.postCreatePost
);

// @route DELETE api/posts/:post_id
// @desc  Delete post by id
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deletePost
);

// @route POST api/posts/like/:post_id
// @desc  Like post
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.postLikePost
);

// @route POST api/posts/unlike/:post_id
// @desc  Unlike post
// @access Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.postUnlikePost
);

// @route POST api/posts/comment/:post_id
// @desc  Add comment to the post
// @access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.postAddCommentToPost
);

// @route DELETE api/posts/:post_id/comment/:comment_id
// @desc  Delete comment from the post
// @access Private
router.delete(
  "/:post_id/comment/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postControllers.deleteCommentFromPost
);

module.exports = router;
