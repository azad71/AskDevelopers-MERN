// import dependency
// load models
const User = require("../models/user");

// load libraries
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// load utitlities
const validateSignUpInput = require("../validators/signup");
const validateLoginInput = require("../validators/login");

// load environment variables
require("dotenv").config();

exports.postSignUp = async (req, res) => {
  try {
    const { errors, isValid } = validateSignUpInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      avatar,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const password = req.body.password;
    const email = req.body.email;

    const user = await User.findOne({ email });
    // check if user exists
    if (!user) {
      errors.email = "User with this email not found";
      return res.status(404).json(errors);
    }

    // check for password
    const doMatch = await bcrypt.compare(password, user.password);
    if (doMatch) {
      // create payload
      const { _id, name, email, avatar } = user;
      const payload = { _id, name, email, avatar };
      const secret_key = process.env.SECRET_KEY;

      // attach payload to jwt token
      const token = jwt.sign(payload, secret_key, { expiresIn: 3600 });

      res.status(200).json({
        message: "Success",
        token: `Bearer ${token}`,
      });
    } else {
      errors.password = "Wrong Password";
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const { _id, name, email, avatar } = req.user;
    res.status(200).json({ _id, name, email, avatar });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
