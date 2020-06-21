// import dependencies
// load models
const Post = require("../models/post");
const Profile = require("../models/profile");

// load validators
const validatePostInput = require("../validators/post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.status(404).json({ post: "No post found" });

    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error fetching post" });
  }
};

exports.postCreatePost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id,
    });

    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's error creating post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.user._id;
    await Post.findOneAndRemove({
      $and: [{ _id: post_id }, { user: user_id }],
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's error deleting post" });
  }
};

exports.postLikePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.user._id;

    const post = await Post.findById(post_id);

    const isLiked = post.likes.filter(
      (like) => like.user.toString() === user_id.toString()
    );

    if (isLiked.length > 0) {
      return res
        .status(400)
        .json({ alreadyLiked: "User already liked this post" });
    }

    post.likes.unshift({ user: user_id });
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's error liking this  post" });
  }
};

exports.postUnlikePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const user_id = req.user._id;
    const post = await Post.findById(post_id);

    const isLiked = post.likes.filter(
      (like) => like.user.toString() === user_id.toString()
    );

    if (isLiked.length === 0) {
      return res
        .status(400)
        .json({ notLiked: "You haven't yet liked this post" });
    }

    post.likes = post.likes.filter(
      (like) => like.user.toString() !== isLiked[0]["user"].toString()
    );

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "There's error liking this  post" });
  }
};

exports.postAddCommentToPost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const post = await Post.findById(req.params.post_id);
    const comment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user._id,
    };

    post.comments.unshift(comment);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ postNotFound: "Error commenting on this post" });
  }
};

exports.deleteCommentFromPost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const comment_id = req.params.comment_id;

    const post = await Post.findById(post_id);

    const isCommentExist = post.comments.filter(
      (comment) => comment._id.toString() === comment_id.toString()
    );

    if (isCommentExist === 0) {
      return res
        .status(404)
        .json({ commentNotFound: "Comment does not exist" });
    }

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== comment_id.toString()
    );

    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ commentNotFound: "Error deleting the comment from this post" });
  }
};
